import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import OwnedMaidList from "../component/maid/OwnedMaidList";
import Layout from "./Layout";

export default class Dashboard implements View {

    private container: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/dashboard/background.jpg");
        Layout.current.content.append(this.container = el(".dashboard-view",
            el("header",
                el("h2", "Dashboard"),
                el("p", "Manage your NFTs."),
                new OwnedMaidList(),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
