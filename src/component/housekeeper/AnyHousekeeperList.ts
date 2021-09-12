import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import LingerieGirlsContract from "../../contracts/LingerieGirlsContract";
import SushiGirlsContract from "../../contracts/SushiGirlsContract";
import Wallet from "../../ethereum/Wallet";
import AnyHousekeeper from "./AnyHousekeeper";

export default class AnyHousekeeperList extends DomNode {

    private content: DomNode;
    public selectedHousekeeper: AnyHousekeeper | undefined;

    constructor(private selectable = false) {
        super(".any-housekeeper-list");
        this.append(
            el(".background"),
            this.content = el(".content"),
        );
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
        });
    }

    private async loadSushiGirls(owner: string) {

        const count = await SushiGirlsContract.balanceOf(owner);

        SkyUtil.repeat(count.toNumber(), async (index) => {
            const id = (await SushiGirlsContract.getTokenOfOwnerByIndex(owner, index)).toNumber();
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
        });
    }

    public deselectHousekeeper() {
        this.selectedHousekeeper?.deselect();
        this.selectedHousekeeper = undefined;
    }
}
