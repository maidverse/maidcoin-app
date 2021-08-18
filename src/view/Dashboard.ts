import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import AnyHousekeeperList from "../component/housekeeper/AnyHousekeeperList";
import OwnedMaidList from "../component/maid/OwnedMaidList";
import NursePartList from "../component/nurse-part/NursePartList";
import NursePoolList from "../component/nurse-pool/NursePoolList";
import Layout from "./Layout";

export default class Dashboard implements View {

    private container: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/dashboard/background.jpg");
        Layout.current.content.append(this.container = el(".dashboard-view",
            el("header",
                el("h2", "Dashboard"),
                el("p", "Manage your NFTs."),
            ),
            el("section",
                el("h3", "Maid"),
                new OwnedMaidList(),
            ),
            el("section",
                el("h3", "Housekeeper"),
                new AnyHousekeeperList(),
            ),
            el("section",
                el("h3", "Clone Nurse"),
                new NursePoolList(),
            ),
            el("section",
                el("h3", "Nurse Part"),
                new NursePartList(),
            ),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
