import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import MaidCafeContract from "../../contracts/MaidCafeContract";
import MaidCoinContract from "../../contracts/MaidCoinContract";
import Wallet from "../../ethereum/Wallet";

export default class StakeTab extends DomNode {

    private input: DomNode<HTMLInputElement>;

    constructor() {
        super(".tab.stake-tab");
        this.append(
            el(".input-container",
                this.input = el("input"),
                el("a.max-button", "Max", {
                    click: async () => {
                        const owner = await Wallet.loadAddress();
                        if (owner !== undefined) {
                            const balance = await MaidCoinContract.balanceOf(owner);
                            this.input.domElement.value = utils.formatEther(balance);
                        }
                    },
                }),
            ),
            el("a.confirm-button", "Stake", {
                click: async () => {
                    await MaidCafeContract.enter(utils.parseEther(this.input.domElement.value));
                    this.input.domElement.value = "";
                },
            }),
        );
        this.loadBalance();

        Wallet.on("connect", this.connectHandler);
        MaidCoinContract.on("Transfer", this.transferHandler);
    }

    private connectHandler = () => {
        this.loadBalance();
    };

    private transferHandler = async (from: string, to: string, amount: BigNumber) => {
        const address = await Wallet.loadAddress();
        if (from === address || to === address) {
            this.loadBalance();
        }
    };

    private async loadBalance() {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const balance = await MaidCoinContract.balanceOf(owner);
            this.input.domElement.placeholder = `Balance: ${utils.formatEther(balance)}`;
        }
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        MaidCoinContract.off("Transfer", this.transferHandler);
        super.delete();
    }
}
