import { DomNode, el } from "@hanul/skynode";
import { View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import StakeTab from "../component/maid-cafe/StakeTab";
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
            el(".tabs",
                el("a.stake-button.on", "Stake $MAID"),
                el("a.unstake-button", "Unstake"),
                el(".apr", "APR: ",
                    this.apr = el("span"),
                ),
                el(".price",
                    "1 $OMU = ",
                    this.price = el("span"),
                    " $MAID",
                ),
                this.currentTab = new StakeTab(),
            ),
            el(".balance",
                el("img.npc", { src: "/images/view/maid-cafe/npc.png", height: "496.5" }),
                this.omuBalance = el(".omu-balance"),
                this.maidcoinBalance = el(".maidcoin-balance"),
            ),
        ));
        this.loadBalance();
    }

    private async loadBalance() {

    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
