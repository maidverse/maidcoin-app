import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
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
        this.loadSushiGirls();
    }

    private async loadSushiGirls() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const sushiGirlCount = await SushiGirlsContract.balanceOf(owner);

            SkyUtil.repeat(sushiGirlCount.toNumber(), async (index) => {
                const sushiGirlId = (await SushiGirlsContract.getTokenOfOwnerByIndex(owner, index)).toNumber();
                const housekeeper = new AnyHousekeeper("SushiGirl", sushiGirlId, this.selectable).appendTo(this.content);
                housekeeper.on("select", () => {
                    if (housekeeper === this.selectedHousekeeper) {
                        this.deselectHousekeeper();
                        this.fireEvent("deselect");
                    } else {
                        this.selectedHousekeeper?.deselect();
                        this.selectedHousekeeper = housekeeper;
                        this.fireEvent("select", "SushiGirl", sushiGirlId);
                    }
                });
            });
        }
    }

    public deselectHousekeeper() {
        this.selectedHousekeeper?.deselect();
        this.selectedHousekeeper = undefined;
    }
}
