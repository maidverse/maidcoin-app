import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import { View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import Calculator from "../Calculator";
import CommonUtil from "../CommonUtil";
import StakeTab from "../component/maid-cafe/StakeTab";
import UnstakeTab from "../component/maid-cafe/UnstakeTab";
import MaidCafeContract from "../contracts/MaidCafeContract";
import MaidCoinContract from "../contracts/MaidCoinContract";
import Wallet from "../ethereum/Wallet";
import Layout from "./Layout";

export default class MaidCafe implements View {

    private container: DomNode;

    private main: DomNode;
    private stakeButton: DomNode;
    private unstakeButton: DomNode;
    private currentTab: DomNode;

    private apr: DomNode;
    private price: DomNode;

    private omuBalance: DomNode;
    private maidcoinBalance: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/maid-cafe/background.jpg", "top");
        Layout.current.content.append(this.container = el(".maid-cafe-view",
            el("header",
                el("h2", "Maid Cafe"),
                el("p", "Maximize yield by staking $MAID for $OMU"),
            ),
            this.main = el("main",
                el(".button-container",
                    this.stakeButton = el("a.stake-button.on", "Stake $MAID", {
                        click: () => {
                            this.currentTab.delete();
                            this.currentTab = new StakeTab().appendTo(this.main);
                            this.stakeButton.addClass("on");
                            this.unstakeButton.deleteClass("on");
                        },
                    }),
                    this.unstakeButton = el("a.unstake-button", "Unstake", {
                        click: () => {
                            this.currentTab.delete();
                            this.currentTab = new UnstakeTab().appendTo(this.main);
                            this.stakeButton.deleteClass("on");
                            this.unstakeButton.addClass("on");
                        },
                    }),
                ),
                el(".info",
                    el(".apr", "Last 24 Hours APR: ", this.apr = el("span")),
                    el(".price", "1 $OMU = ", this.price = el("span"), " $MAID"),
                ),
                this.currentTab = new StakeTab(),
            ),
            el("footer",
                el("img.npc", { src: "/images/view/maid-cafe/npc.png", height: "761" }),
                el(".balance-container",
                    this.omuBalance = el(".balance"),
                    this.maidcoinBalance = el(".balance"),
                ),
            ),
        ));
        this.loadAPR();
        this.loadBalances();

        Wallet.on("connect", this.connectHandler);
        MaidCoinContract.on("Transfer", this.transferHandler);
        MaidCafeContract.on("Transfer", this.transferHandler);
    }

    private connectHandler = () => {
        this.loadBalances();
    };

    private transferHandler = async (from: string, to: string, amount: BigNumber) => {
        const address = await Wallet.loadAddress();
        if (from === address || to === address) {
            this.loadBalances();
        }
    };

    private async loadAPR() {
        const omu = await MaidCafeContract.getTotalSupply();
        const maidcoin = await MaidCoinContract.balanceOf(MaidCafeContract.address);
        const apr = await Calculator.cafeAPR24();
        this.apr.empty().appendText(`${CommonUtil.numberWithCommas(apr.toString())}%`);
        this.price.empty().appendText(CommonUtil.displayPrice(maidcoin.mul(BigNumber.from("1000000000000000000")).div(omu)));
    }

    private async loadBalances() {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const lpBalance = await MaidCafeContract.balanceOf(owner);
            const maidBalance = await MaidCoinContract.balanceOf(owner);
            this.omuBalance.empty().append(
                el("img", { src: "/images/view/maid-cafe/omu.png", height: "40" }),
                el(".amount",
                    CommonUtil.numberWithCommas(CommonUtil.displayPrice(lpBalance)),
                    el("span", "$OMU"),
                ),
            );
            this.maidcoinBalance.empty().append(
                el("img", { src: "/images/view/maid-cafe/maidcoin.png", height: "41.5" }),
                el(".amount",
                    CommonUtil.numberWithCommas(CommonUtil.displayPrice(maidBalance)),
                    el("span", "$MAID"),
                ),
            );
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {

        Wallet.off("connect", this.connectHandler);
        MaidCoinContract.off("Transfer", this.transferHandler);
        MaidCafeContract.off("Transfer", this.transferHandler);

        this.container.delete();
    }
}
