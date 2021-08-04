import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Earn implements View {

    private container: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/earn/background.jpg");
        Layout.current.content.append(this.container = el(".earn-view",
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
