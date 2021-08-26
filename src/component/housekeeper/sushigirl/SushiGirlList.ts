import { DomNode } from "@hanul/skynode";
import SushiGirlsContract from "../../../contracts/SushiGirlsContract";
import Wallet from "../../../ethereum/Wallet";

export default class SushiGirlList extends DomNode {

    constructor() {
        super(".sushi-girl-list");
        this.loadSushiGirls();
    }

    private async loadSushiGirls() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const sushiGirlCount = (await SushiGirlsContract.balanceOf(owner)).toNumber();
            console.log(sushiGirlCount);
        }
    }
}
