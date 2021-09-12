import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import NursePartContract from "../../contracts/NursePartContract";
import TheMasterContract from "../../contracts/TheMasterContract";
import Wallet from "../../ethereum/Wallet";

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
    }

    private connectHandler = () => {
        this.load();
    };

    private async load() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const lpAmount = await TheMasterContract.getLPAmount(1, owner);
            const reward = await TheMasterContract.getPendingReward(1, owner);

            this.content.empty().append(
                el("a.claim-button",
                    el("img.maidcoin", { src: "/images/component/maid-corp/maidcoin.png", height: "29" }),
                    el("span.reward", utils.formatEther(reward)),
                ),
                el("a.withdraw-button", "Withdraw", {
                    click: async () => {
                        const amount = prompt("How much amount to withdraw?", "10");
                        if (amount) {
                            await TheMasterContract.withdraw(1, utils.parseEther(amount));
                        }
                    },
                }),
                el("a.deposit-button", "Deposit", {
                    click: async () => {
                        const amount = prompt("How much amount to deposit?", "10");
                        if (amount) {
                            await TheMasterContract.deposit(1, utils.parseEther(amount));
                        }
                    },
                }),
            );

            this.footer.empty().append(
                el(".property.lp-amount", "Deposited LP: ", el("span", utils.formatEther(lpAmount))),
                el(".property.apr", "APR: ", el("span", "0%")), //TODO:
            );
        }
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        super.delete();
    }
}
