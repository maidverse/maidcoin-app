import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import LPTokenContract from "../../contracts/LPTokenContract";
import TheMasterContract from "../../contracts/TheMasterContract";
import Wallet from "../../ethereum/Wallet";
import TokenPrompt from "../dialogue/TokenPrompt";

export default class Nurse extends DomNode {

    constructor(public nurseId: number, private owner: string) {
        super(".nurse");
        this.load();
    }

    private async load() {
        const { nurseType } = await CloneNursesContract.getNurse(this.nurseId);
        const supportedPower = await CloneNursesContract.getSupportedPower(this.nurseId);
        const result = await superagent.get(`https://api.maidcoin.org/nursetypes/${nurseType}`);
        const tokenInfo = result.body;

        this.empty().append(
            el(".slot",
                el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${tokenInfo.name}.png` }),
                el(".name", tokenInfo.name),
            ),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(this.owner)}`),
            el(".lp-amount", "Supported LP : ", el("span", utils.formatEther(supportedPower))),
            el("a.support-button", "Support", {
                click: async (event: MouseEvent) => {
                    event.stopPropagation();
                    const owner = await Wallet.loadAddress();
                    if (owner !== undefined) {
                        const balance = await LPTokenContract.balanceOf(owner);
                        new TokenPrompt("Support Nurse", "How much amount to support?", "Support", 0, balance, async (amount) => {
                            await TheMasterContract.support(3, amount, this.nurseId);
                        });
                    }
                },
            }),
        );
    }
}
