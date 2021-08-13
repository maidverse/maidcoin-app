import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import Layout from "./Layout";

export default class Housekeeper implements View {

    private container: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/housekeeper/background.jpg");
        Layout.current.content.append(this.container = el(".housekeeper-view",
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
