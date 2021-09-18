import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import { View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import CommonUtil from "../CommonUtil";
import StakeTab from "../component/maid-cafe/StakeTab";
import LPTokenContract from "../contracts/LPTokenContract";
import MaidCafeContract from "../contracts/MaidCafeContract";
import MaidCoinContract from "../contracts/MaidCoinContract";
import Wallet from "../ethereum/Wallet";
import Layout from "./Layout";

export default class MaidCafe implements View {

    private container: DomNode;
    private apr: DomNode;
    private price: DomNode;
    private omuBalance: DomNode;
    private maidcoinBalance: DomNode;
    private currentTab: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/maid-cafe/background.jpg");
        Layout.current.content.append(this.container = el(".maid-cafe-view",
            el("header",
                el("h2", "Maid Cafe"),
                el("p", "Maximize yield by staking $MAID for $OMU"),
            ),
            el("main",
                el(".button-container",
                    el("a.stake-button.on", "Stake $MAID"),
                    el("a.unstake-button", "Unstake"),
                ),
                el(".info",
                    el(".apr", "APR: ", this.apr = el("span")),
                    el(".price", "1 $OMU = ", this.price = el("span"), " $MAID"),
                ),
                this.currentTab = new StakeTab(),
            ),
            el("footer",
                el("img.npc", { src: "/images/view/maid-cafe/npc.png", height: "447" }),
                el(".balance",
                    this.omuBalance = el(".omu-balance"),
                    this.maidcoinBalance = el(".maidcoin-balance"),
                ),
            ),
        ));
        this.loadBalance();
    }

    private async loadBalance() {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const lpBalance = await MaidCafeContract.balanceOf(owner);
            const maidBalance = await MaidCoinContract.balanceOf(owner);
            this.omuBalance.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(lpBalance)));
            this.maidcoinBalance.empty().appendText(CommonUtil.numberWithCommas(utils.formatEther(maidBalance)));
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
