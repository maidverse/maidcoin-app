import { DomNode, el } from "@hanul/skynode";
import { View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import NurseRaidList from "../component/nurse-raid/NurseRaidList";
import Layout from "./Layout";

export default class NurseRaid implements View {

    private container: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/nurse-raid/background.jpg");
        Layout.current.content.append(this.container = el(".nurse-raid-view",
            el("header",
                el("h2", "Nurse Raid"),
                el("p", "Defeat Nurses and get Nurse Parts."),
            ),
            new NurseRaidList(),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
