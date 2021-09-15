import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import LPTokenContract from "../../contracts/LPTokenContract";
import TheMasterContract from "../../contracts/TheMasterContract";
import Wallet from "../../ethereum/Wallet";
import TokenPrompt from "../dialogue/TokenPrompt";
import SelectNursePopup from "../select-nurse-popup/SelectNursePopup";

export default class NurseFarm extends DomNode {

    private content: DomNode;
    private footer: DomNode;

    constructor() {
        super(".nurse-farm");
        this.append(
            el(".background"),
            this.content = el(".content"),
            this.footer = el("footer"),
        );
        this.load();
        Wallet.on("connect", this.connectHandler);
    }

    private connectHandler = () => {
        this.load();
    };

    private async load() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const supportingAmount = await TheMasterContract.getSupportingAmount(owner);
            if (supportingAmount.eq(0) === true) {
                this.addClass("empty");

                this.content.empty().append(
                    el(".name", "Clone Nurse"),
                    el("a.add-button", el("img", { src: "/images/component/nurse-farm/add-button.png", height: "132.5" }), {
                        click: () => new SelectNursePopup(),
                    }),
                );

                this.footer.empty().append(
                    el(".property.apr", "APR: ", el("span", "0%")), //TODO:
                );
            }

            else {
                this.deleteClass("empty");

                const supportingTo = (await CloneNursesContract.getSupportingTo(owner)).toNumber();
                const nurse = await CloneNursesContract.getNurse(supportingTo);
                const nurseOwner = await CloneNursesContract.ownerOf(supportingTo);

                const result = await superagent.get(`https://api.maidcoin.org/nursetypes/${nurse.nurseType}`);
                const tokenInfo = result.body;

                const lpAmount = await TheMasterContract.getLPAmount(3, owner);
                const reward = await TheMasterContract.getPendingReward(3, owner);

                this.content.empty().append(

                    el(".name", tokenInfo.name),
                    el(".owner", `Owner: ${CommonUtil.shortenAddress(nurseOwner)}`),
                    el(".image", { style: { backgroundImage: `url(https://storage.googleapis.com/maidcoin/Nurse/Illust/${tokenInfo.name}.png)` } }),

                    el("a.claim-button",
                        el("img.maidcoin", { src: "/images/component/maid-corp/maidcoin.png", height: "29" }),
                        el("span.reward", utils.formatEther(reward)),
                    ),
                    el("a.desupport-button", "Desupport", {
                        click: async () => {
                            const lpBalance = await LPTokenContract.balanceOf(owner);
                            new TokenPrompt(
                                "Desupport Nurse",
                                "How much amount to desupport?",
                                "Desupport",
                                0, lpBalance,
                                async (amount) => {
                                    await TheMasterContract.desupport(3, amount);
                                },
                            );
                        },
                    }),
                    el("a.support-button", "Support", {
                        click: async () => {
                            const lpBalance = await LPTokenContract.balanceOf(owner);
                            new TokenPrompt(
                                "Support Nurse",
                                "How much amount to support?",
                                "Support",
                                0, lpBalance,
                                async (amount) => {
                                    await TheMasterContract.support(3, amount, supportingTo);
                                },
                            );
                        },
                    }),
                );

                this.footer.empty().append(
                    el(".property.lp-amount", "Deposited LP: ", el("span", utils.formatEther(lpAmount))),
                    el(".property.apr", "APR: ", el("span", "0%")), //TODO:
                );
            }
        }
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        super.delete();
    }
}
