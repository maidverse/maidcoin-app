import { DomNode, el } from "@hanul/skynode";
import { BigNumber } from "ethers";
import Calculator from "../../Calculator";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import LPTokenContract from "../../contracts/LPTokenContract";
import TheMasterContract from "../../contracts/TheMasterContract";
import Wallet from "../../ethereum/Wallet";
import StaticDataManager from "../../StaticDataManager";
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
        TheMasterContract.on("Support", this.supportHandler);
        TheMasterContract.on("Desupport", this.desupportHandler);
    }

    private connectHandler = () => {
        this.load();
    };

    private supportHandler = (userId: BigNumber, pid: BigNumber, amount: BigNumber) => {
        if (pid.toNumber() === 3) {
            this.load();
        }
    };

    private desupportHandler = (userId: BigNumber, pid: BigNumber, amount: BigNumber) => {
        if (pid.toNumber() === 3) {
            this.load();
        }
    };

    private async load() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const supportingAmount = await TheMasterContract.getSupportingAmount(owner);
            const totalLPAmount = await TheMasterContract.getPoolAmount(3);

            if (supportingAmount.eq(0) === true) {
                this.addClass("empty");

                this.content.empty().append(
                    el(".name", "Clone Nurse"),
                    el(".total-lp-amount", "Total Deposited LP: ", el("span", CommonUtil.displayPrice(totalLPAmount))),
                    el("a.add-button", el("img", { src: "/images/component/nurse-farm/add-button.png", height: "132.5" }), {
                        click: () => new SelectNursePopup(),
                    }),
                );

                const apr = await Calculator.poolAPR(3);
                this.footer.empty().append(
                    el(".property.apr", "APR: ", el("span", `${CommonUtil.numberWithCommas(apr.toString())}%`)),
                );
            }

            else {
                this.deleteClass("empty");

                const { supportingTo } = await CloneNursesContract.findSupportingTo(owner);
                const nurse = await CloneNursesContract.getNurse(supportingTo);
                const nurseOwner = await CloneNursesContract.ownerOf(supportingTo);

                const nurseType = StaticDataManager.getNurseType(nurse.nurseType);

                const lpAmount = await TheMasterContract.getUserLPAmount(3, owner);
                const reward = await TheMasterContract.getPendingReward(3, owner);

                this.content.empty().append(

                    el(".name", nurseType.name),
                    el(".owner", `Owner: ${CommonUtil.shortenAddress(nurseOwner)}`),
                    el(".image", {
                        style: {
                            backgroundImage: `url(https://storage.googleapis.com/maidcoin/Nurse/Illust/${nurseType.name}.png)`,
                            width: nurseType.width,
                            backgroundPosition: `${nurseType.left}px calc(50% + ${nurseType.top + 56}px)`,
                        },
                    }),

                    el(".total-lp-amount", "Total Deposited LP: ", el("span", CommonUtil.displayPrice(totalLPAmount))),
                    el("a.claim-button",
                        el("img.maidcoin", { src: "/images/component/maid-corp/maidcoin.png", height: "29" }),
                        el("span.reward", CommonUtil.displayPrice(reward)),
                        el("a.claim-button", "Claim"),
                        {
                            click: async (event: MouseEvent) => {
                                event.stopPropagation();
                                await TheMasterContract.support(3, 0, supportingTo);
                            },
                        },
                    ),
                    el("a.desupport-button", "Desupport", {
                        click: async () => {
                            new TokenPrompt(
                                "Desupport Nurse",
                                "How much amount to desupport?",
                                "Desupport",
                                0, lpAmount,
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

                const apr = await Calculator.poolAPR(3);
                this.footer.empty().append(
                    el(".property.lp-amount", "LP Supported By Me: ", el("span", CommonUtil.displayPrice(lpAmount))),
                    el(".property.apr", "APR: ", el("span", `${CommonUtil.numberWithCommas(apr.toString())}%`)),
                );
            }
        }

        else {
            this.addClass("empty");

            const totalLPAmount = await TheMasterContract.getPoolAmount(3);
            this.content.empty().append(
                el(".name", "Clone Nurse"),
                el(".total-lp-amount", "Total Deposited LP: ", el("span", CommonUtil.displayPrice(totalLPAmount))),
                el("a.add-button", el("img", { src: "/images/component/nurse-farm/add-button.png", height: "132.5" }), {
                    click: () => Wallet.connect(),
                }),
            );

            const apr = await Calculator.poolAPR(3);
            this.footer.empty().append(
                el(".property.apr", "APR: ", el("span", `${CommonUtil.numberWithCommas(apr.toString())}%`)),
            );
        }
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        TheMasterContract.off("Support", this.supportHandler);
        TheMasterContract.off("Desupport", this.desupportHandler);
        super.delete();
    }
}
