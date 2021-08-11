import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import NurseFactoryList from "../component/nurse-factory/NurseFactoryList";
import Layout from "./Layout";

export default class Nursefactory implements View {

    private container: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/nursefactory/background.jpg");
        Layout.current.content.append(this.container = el(".nurse-factory-view",
            el("header",
                el("h2", "Nurse Factory"),
                el("p", "You can make Clone Nurses with Nurse Parts."),
            ),
            new NurseFactoryList(),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
