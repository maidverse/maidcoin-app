import { DomNode, el } from "@hanul/skynode";
import { View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import MaidList from "../component/maid/MaidList";
import Layout from "./Layout";

export default class Maid implements View {

    private container: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/maid/background.jpg");
        Layout.current.content.append(this.container = el(".maid-view",
            el("header",
                el("h2", "Maids"),
                el("p", "Maids helps humanity fight the Nurse."),
            ),
            new MaidList(),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
