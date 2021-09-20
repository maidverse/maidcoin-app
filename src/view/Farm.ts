import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import MaidCorp from "../component/maid-corp/MaidCorp";
import NurseFarm from "../component/nurse-farm/NurseFarm";
import Layout from "./Layout";

export default class Farm implements View {

    private container: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/farm/background.jpg");
        Layout.current.content.append(this.container = el(".farm-view",
            el("header",
                el("h2", "Farms"),
                el("p", "Earn $MAID!"),
            ),
            new MaidCorp(),
            new NurseFarm(),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
