import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import MaidCoinContract from "../../contracts/MaidCoinContract";
import TheMasterContract from "../../contracts/TheMasterContract";
import NetworkProvider from "../../ethereum/NetworkProvider";
import StaticDataManager from "../../StaticDataManager";
import TokenPrompt from "../dialogue/TokenPrompt";

export default class Nurse extends DomNode {

    private lifetime: undefined | DomNode;

    private currentBlockNumber: undefined | number;
    private endBlock: undefined | number;

    constructor(public nurseId: number) {
        super(".nurse");
        this.load();
    }

    private async refreshLifetime() {
        if (this.endBlock !== undefined && this.currentBlockNumber !== undefined) {
            this.lifetime?.empty().appendText(
                CommonUtil.displayBlockDuration(this.endBlock - this.currentBlockNumber),
            );
        }
    }

    private async load() {

        this.currentBlockNumber = await NetworkProvider.getBlockNumber();
        const nurse = await CloneNursesContract.getNurse(this.nurseId);
        this.endBlock = nurse.endBlock;

        const owner = await CloneNursesContract.ownerOf(this.nurseId);
        const supportedPower = await CloneNursesContract.getSupportedPower(this.nurseId);

        const nurseType = StaticDataManager.getNurseType(nurse.nurseType);

        this.empty().append(
            el(".slot",
                el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${nurseType.name}.png` }),
                el(".name", nurseType.name),
            ),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(owner)}`),
            el(".lp-amount", "Supported LP : ", el("span", utils.formatEther(supportedPower))),
            el("a.support-button", "Support", {
                click: async (event: MouseEvent) => {
                    event.stopPropagation();
                    const balance = await MaidCoinContract.balanceOf(owner);
                    new TokenPrompt("Support Nurse", "How much amount to support?", "Support", 0, balance, async (amount) => {
                        await TheMasterContract.support(3, amount, this.nurseId);
                    });
                },
            }),
        );

        this.refreshLifetime();
    }
}
