import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import LingerieGirlsContract from "../../contracts/LingerieGirlsContract";
import SushiGirlsContract from "../../contracts/SushiGirlsContract";
import Wallet from "../../ethereum/Wallet";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../Loading";
import AnyHousekeeper from "./AnyHousekeeper";

export default class AnyHousekeeperList extends DomNode {

    private content: DomNode;
    private loading: Loading | undefined;
    public selectedHousekeeper: AnyHousekeeper | undefined;

    private zoomButton: DomNode | undefined;

    constructor(private selectable = false) {
        super(".any-housekeeper-list");
        this.append(
            this.loading = new Loading(),
            el(".background"),
            this.content = el(".content",
                this.zoomButton = el("a.zoom-button",
                    el("img", { src: "/images/view/dashboard/zoom-button.png", height: "27.5" }),
                    "View Housekeepers",
                    { click: () => ViewUtil.go("/housekeepers") },
                ),
            ),
        );
        this.zoomButton.on("delete", () => this.zoomButton = undefined);
        this.loadHousekeepers();
        Wallet.on("connect", this.connectHandler);
    }

    private connectHandler = () => {
        if (this.loading === undefined) {
            this.loadHousekeepers();
        }
    };

    private async loadHousekeepers() {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            await this.loadLingerieGirls(owner);
            await this.loadSushiGirls(owner);
        }
        if (this.deleted !== true) {
            this.loading?.delete();
            this.loading = undefined;
        }
    }

    private async loadLingerieGirls(owner: string) {

        const count = await LingerieGirlsContract.balanceOf(owner);

        await SkyUtil.repeatAsync(count.toNumber(), async (index) => {
            const id = (await LingerieGirlsContract.getTokenOfOwnerByIndex(owner, index)).toNumber();

            if (this.deleted !== true) {
                this.zoomButton?.delete();
                const housekeeper = new AnyHousekeeper("LingerieGirl", id, this.selectable).appendTo(this.content);
                housekeeper.on("select", () => {
                    if (housekeeper === this.selectedHousekeeper) {
                        this.deselectHousekeeper();
                        this.fireEvent("deselect");
                    } else {
                        this.selectedHousekeeper?.deselect();
                        this.selectedHousekeeper = housekeeper;
                        this.fireEvent("select", "LingerieGirl", id);
                    }
                });
            }
        });
    }

    private async loadSushiGirls(owner: string) {

        const count = await SushiGirlsContract.balanceOf(owner);

        await SkyUtil.repeatAsync(count.toNumber(), async (index) => {
            const id = (await SushiGirlsContract.getTokenOfOwnerByIndex(owner, index)).toNumber();

            if (this.deleted !== true) {
                this.zoomButton?.delete();
                const housekeeper = new AnyHousekeeper("SushiGirl", id, this.selectable).appendTo(this.content);
                housekeeper.on("select", () => {
                    if (housekeeper === this.selectedHousekeeper) {
                        this.deselectHousekeeper();
                        this.fireEvent("deselect");
                    } else {
                        this.selectedHousekeeper?.deselect();
                        this.selectedHousekeeper = housekeeper;
                        this.fireEvent("select", "SushiGirl", id);
                    }
                });
            }
        });
    }

    public deselectHousekeeper() {
        this.selectedHousekeeper?.deselect();
        this.selectedHousekeeper = undefined;
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        super.delete();
    }
}
