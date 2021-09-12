import { DomNode, el } from "@hanul/skynode";
import { View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import MaidList from "../component/maid/MaidList";
import Layout from "./Layout";

export default class MaidCafe implements View {

    private container: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/maid-cafe/background.jpg");
        Layout.current.content.append(this.container = el(".maid-cafe-view",
            el("header",
                el("h2", "Maid Cafe"),
                el("p", "Maximize yield by staking $MAID for $OMU"),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
