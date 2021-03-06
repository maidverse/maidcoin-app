import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import Calculator from "../../Calculator";
import CommonUtil from "../../CommonUtil";
import LPTokenContract from "../../contracts/LPTokenContract";
import TheMasterContract from "../../contracts/TheMasterContract";
import Wallet from "../../ethereum/Wallet";
import TokenPrompt from "../dialogue/TokenPrompt";

export default class MaidCorp extends DomNode {

    private content: DomNode;
    private footer: DomNode;

    constructor() {
        super(".maid-corp");
        this.append(
            el(".background"),
            el(".name", "Maid Corporation"),
            el("img.ada", { src: "/images/component/maid-corp/ada.png", height: "222.5" }),
            this.content = el(".content"),
            this.footer = el("footer"),
        );
        this.load();
        Wallet.on("connect", this.connectHandler);
        TheMasterContract.on("Deposit", this.depositHandler);
        TheMasterContract.on("Withdraw", this.withdrawHandler);
    }

    private connectHandler = () => {
        this.load();
    };

    private depositHandler = (userId: BigNumber, pid: BigNumber, amount: BigNumber) => {
        if (pid.toNumber() === 1) {
            this.load();
        }
    };

    private withdrawHandler = (userId: BigNumber, pid: BigNumber, amount: BigNumber) => {
        if (pid.toNumber() === 1) {
            this.load();
        }
    };

    private async load() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const lpAmount = await TheMasterContract.getUserLPAmount(1, owner);
            const totalLPAmount = await TheMasterContract.getPoolAmount(1);
            const reward = await TheMasterContract.getPendingReward(1, owner);
            const lpBalance = await LPTokenContract.balanceOf(owner);

            this.content.empty().append(
                el(".total-lp-amount", "Total Deposited LP: ", el("span", CommonUtil.displayPrice(totalLPAmount))),
                el("a.claim-button",
                    el("img.maidcoin", { src: "/images/component/maid-corp/maidcoin.png", height: "29" }),
                    el("span.reward", CommonUtil.displayPrice(reward)),
                    el("a.claim-button", "Claim"),
                    {
                        click: async (event: MouseEvent) => {
                            event.stopPropagation();
                            await TheMasterContract.deposit(1, 0);
                        },
                    },
                ),
                el("a.withdraw-button", "Withdraw", {
                    click: () => new TokenPrompt(
                        "Withdraw from MaidCorp",
                        "How much amount to withdraw?",
                        "Withdraw",
                        0, lpAmount,
                        async (amount) => {
                            await TheMasterContract.withdraw(1, amount);
                        },
                    ),
                }),
                el("a.deposit-button", "Deposit", {
                    click: () => new TokenPrompt(
                        "Deposit to MaidCorp",
                        "How much amount to deposit?",
                        "Deposit",
                        0, lpBalance,
                        async (amount) => {
                            await TheMasterContract.deposit(1, amount);
                        },
                    ),
                }),
            );

            const apr = await Calculator.poolAPR(1);
            this.footer.empty().append(
                el(".property.lp-amount", "LP Deposited By Me: ", el("span", CommonUtil.displayPrice(lpAmount))),
                el(".property.apr", "APR: ", el("span", `${CommonUtil.numberWithCommas(apr.toString())}%`)),
            );
        }

        else {

            const totalLPAmount = await TheMasterContract.getPoolAmount(1);
            this.content.empty().append(
                el(".total-lp-amount", "Total Deposited LP: ", el("span", CommonUtil.displayPrice(totalLPAmount))),
                el("a.withdraw-button", "Withdraw", {
                    click: () => Wallet.connect(),
                }),
                el("a.deposit-button", "Deposit", {
                    click: () => Wallet.connect(),
                }),
            );

            const apr = await Calculator.poolAPR(1);
            this.footer.empty().append(
                el(".property.apr", "APR: ", el("span", `${CommonUtil.numberWithCommas(apr.toString())}%`)),
            );
        }
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        TheMasterContract.off("Deposit", this.depositHandler);
        TheMasterContract.off("Withdraw", this.withdrawHandler);
        super.delete();
    }
}
