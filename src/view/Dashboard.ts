import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import SkyStore from "skystore";
import AnyHousekeeperList from "../component/housekeeper/AnyHousekeeperList";
import OwnedMaidList from "../component/maid/OwnedMaidList";
import NursePartList from "../component/nurse-part/NursePartList";
import NurseDetail from "../component/nurse-pool/NurseDetail";
import NursePoolList from "../component/nurse-pool/NursePoolList";
import Config from "../Config";
import NetworkProvider from "../ethereum/NetworkProvider";
import Wallet from "../ethereum/Wallet";
import Layout from "./Layout";

export default class Dashboard implements View {

    private container: DomNode;
    private welcomeContainer: DomNode;

    private store: SkyStore = new SkyStore("Dashboard");

    constructor(params: ViewParams) {
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
        this.openNurseDetail(params.nurseId);
    }

    private connectHandler = () => {
        this.load();
    };

    private async load() {

        const connected = await Wallet.connected();
        if (this.welcomeContainer.deleted !== true && this.store.get("close-welcome") !== true) {

            this.welcomeContainer.empty().append(
                el(".welcome",
                    el("img", { src: "/images/view/dashboard/welcome.png", height: "142.5" }),
                    el("a.close-welcome-button",
                        el("img", { src: "/images/view/dashboard/close-welcome-button.png", height: "11.25" }),
                        {
                            click: () => {
                                this.store.set("close-welcome", true);
                                this.welcomeContainer.empty();
                            },
                        },
                    ),
                    el(".info",
                        el("p", "Welcome to MaidCoin"),
                        el("a.document-button", "Read Documnet", { href: "https://shillbo.medium.com/how-to-farm-maidcoin-play-the-game-2ee832a8e91c", target: "_blank" }),
                        connected === true ? undefined : el("a.connect-wallet-button", "Connect Wallet", {
                            click: () => Wallet.connect(),
                        }),
                    ),
                ),
            );
        }
    }

    private async openNurseDetail(id: string | undefined) {
        if (id !== undefined) {
            new NurseDetail(parseInt(id, 10));
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.openNurseDetail(params.nurseId);
    }

    public close(): void {
        Wallet.off("connect", this.connectHandler);
        this.container.delete();
    }
}
