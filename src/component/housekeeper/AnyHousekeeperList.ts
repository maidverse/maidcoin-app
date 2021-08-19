import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import SushiGirlContract from "../../contracts/SushiGirlContract";
import Wallet from "../../ethereum/Wallet";
import AnyHousekeeper from "./AnyHousekeeper";

export default class AnyHousekeeperList extends DomNode {

    private content: DomNode;

    constructor() {
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

            const sushiGirlCount = await SushiGirlContract.balanceOf(owner);

            SkyUtil.repeat(sushiGirlCount.toNumber(), async (index) => {
                const sushiGirlId = (await SushiGirlContract.getTokenOfOwnerByIndex(owner, index)).toNumber();
                new AnyHousekeeper("SushiGirl", sushiGirlId).appendTo(this.content);
            });
        }
    }
}
