import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import LingerieGirlsContract from "../../contracts/LingerieGirlsContract";
import SushiGirlsContract from "../../contracts/SushiGirlsContract";
import Wallet from "../../ethereum/Wallet";
import ViewUtil from "../../view/ViewUtil";
import AnyHousekeeper from "./AnyHousekeeper";

export default class AnyHousekeeperList extends DomNode {

    private content: DomNode;
    public selectedHousekeeper: AnyHousekeeper | undefined;

    private zoomButton: DomNode | undefined;

    constructor(private selectable = false) {
        super(".any-housekeeper-list");
        this.append(
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
    }

    private async loadHousekeepers() {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            this.loadLingerieGirls(owner);
            this.loadSushiGirls(owner);
        }
    }

    private async loadLingerieGirls(owner: string) {

        const count = await LingerieGirlsContract.balanceOf(owner);

        SkyUtil.repeat(count.toNumber(), async (index) => {
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

        SkyUtil.repeat(count.toNumber(), async (index) => {
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
}
