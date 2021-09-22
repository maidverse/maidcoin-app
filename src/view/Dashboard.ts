import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import AnyHousekeeperList from "../component/housekeeper/AnyHousekeeperList";
import OwnedMaidList from "../component/maid/OwnedMaidList";
import NursePartList from "../component/nurse-part/NursePartList";
import NursePoolList from "../component/nurse-pool/NursePoolList";
import Wallet from "../ethereum/Wallet";
import Layout from "./Layout";

export default class Dashboard implements View {

    private container: DomNode;
    private welcomeContainer: DomNode;

    constructor() {
        Layout.current.changeBackground("/images/view/dashboard/background.jpg");
        Layout.current.content.append(this.container = el(".dashboard-view",
            el("header",
                el("h2", "Dashboard"),
                el("p", "Manage your NFTs."),
            ),
            this.welcomeContainer = el(".welcome-container"),
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
        Wallet.on("connect", this.connectHandler);
        this.load();
    }

    private connectHandler = () => {
        this.load();
    };

    private async load() {
        const connected = await Wallet.connected();
        this.welcomeContainer.empty().append(
            el(".welcome",
                el("img", { src: "/images/view/dashboard/welcome.png", height: "142.5" }),
                el(".info",
                    el("p", "Welcome to MaidCoin"),
                    el("a.document-button", "Read Documnet", { href: "https://medium.com/maid-coin", target: "_blank" }),
                    connected === true ? undefined : el("a.connect-wallet-button", "Connect Wallet", {
                        click: () => Wallet.connect(),
                    }),
                ),
            ),
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        Wallet.off("connect", this.connectHandler);
        this.container.delete();
    }
}
