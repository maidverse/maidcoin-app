import { DomNode, el } from "@hanul/skynode";
import { View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import NurseRaidList from "../component/nurse-raid/NurseRaidList";
import NurseRaidContract from "../contracts/NurseRaidContract";
import Wallet from "../ethereum/Wallet";
import Layout from "./Layout";

export default class NurseRaid implements View {

    private container: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/nurse-raid/background.jpg");

        let raidList: NurseRaidList;
        Layout.current.content.append(this.container = el(".nurse-raid-view",
            el("header",
                el("h2", "Nurse Raids"),
                el("p", "Defeat Nurses and get Nurse Parts."),
            ),
            el("a.exit-all-button", "Exit All", {
                click: async () => {
                    const owner = await Wallet.loadAddress();
                    if (owner !== undefined) {
                        await NurseRaidContract.exit(await raidList.getDoneRaids(owner));
                    }
                },
            }),
            raidList = new NurseRaidList(),
        ));
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
