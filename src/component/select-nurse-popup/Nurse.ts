import { DomNode, el } from "@hanul/skynode";
import { BigNumber, constants, utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import LPTokenContract from "../../contracts/LPTokenContract";
import TheMasterContract from "../../contracts/TheMasterContract";
import Wallet from "../../ethereum/Wallet";
import TokenPrompt from "../dialogue/TokenPrompt";

export default class Nurse extends DomNode {

    private supportedPower: undefined | DomNode;

    constructor(public nurseId: number, private owner: string) {
        super(".nurse");
        this.load();
        CloneNursesContract.on("ChangeSupportedPower", this.changeSupportedPowerHandler);
        CloneNursesContract.on("Transfer", this.transferHandler);
    }

    private changeSupportedPowerHandler = async (id: BigNumber) => {
        if (id.eq(this.nurseId) === true) {
            const supportedPower = await CloneNursesContract.getSupportedPower(this.nurseId);
            this.supportedPower?.empty().appendText(CommonUtil.displayPrice(supportedPower));
        }
    };

    private transferHandler = async (from: string, to: string, id: BigNumber) => {
        // burn
        if (to === constants.AddressZero && id.eq(this.nurseId) === true) {
            this.delete();
        }
    };

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
            el(".lp-amount", "Supported LP : ", this.supportedPower = el("span", CommonUtil.displayPrice(supportedPower))),
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

    public delete() {
        CloneNursesContract.off("ChangeSupportedPower", this.changeSupportedPowerHandler);
        CloneNursesContract.off("Transfer", this.transferHandler);
        super.delete();
    }
}
