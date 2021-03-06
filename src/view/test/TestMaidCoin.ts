import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import { View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import CommonUtil from "../../CommonUtil";
import TestMaidCoinContract from "../../contracts/test/TestMaidCoinContract";
import Wallet from "../../ethereum/Wallet";
import Layout from "../Layout";

export default class TestMaidCoin implements View {

    private container: DomNode;
    private info: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/maid/background.jpg");
        Layout.current.content.append(this.container = el(".test-maidcoin-view",
            el("h2", "Test $MAID"),
            this.info = el(".info",
                el(".loading", "Loading..."),
            ),
            el(".control",
                el("a.mint-button", "Mint", {
                    click: async () => {
                        const amount = prompt("How much amount to mint?", "10");
                        if (amount) {
                            await TestMaidCoinContract.mint(utils.parseEther(amount));
                        }
                    },
                }),
            ),
        ));
        this.loadInfo();

        Wallet.on("connect", this.connectHandler);
        TestMaidCoinContract.on("Transfer", this.transferHandler);
    }

    private connectHandler = () => {
        this.loadInfo();
    };

    private transferHandler = (from: string, to: string, amount: BigNumber) => {
        this.loadInfo();
    };

    private async loadInfo() {

        const owner = await Wallet.loadAddress();
        const totalSupply = await TestMaidCoinContract.getTotalSupply();
        const balance = owner === undefined ? undefined : await TestMaidCoinContract.balanceOf(owner);

        this.info.empty().append(
            el(".total-supply", `Total Supply: ${CommonUtil.displayPrice(totalSupply)}`),
            el(".balance",
                owner === undefined ?
                    "Your Balance: Please connect to wallet." :
                    `Your Balance: ${CommonUtil.displayPrice(balance!)}`),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {

        Wallet.off("connect", this.connectHandler);
        TestMaidCoinContract.off("Transfer", this.transferHandler);

        this.container.delete();
    }
}