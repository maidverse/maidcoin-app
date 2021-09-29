import { DomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
import SushiGirlsContract from "../../../contracts/SushiGirlsContract";
import SushiGirl from "./SushiGirl";

export default class SushiGirlList extends DomNode {

    constructor() {
        super(".sushigirl-list");
        this.loadSushiGirls();
    }

    private async loadSushiGirls() {

        const count = (await SushiGirlsContract.getTotalSupply()).toNumber();

        SkyUtil.repeat(count, (id) => {
            setTimeout(() => {
                if (this.deleted !== true) {
                    new SushiGirl(id).appendTo(this);
                }
            }, id * 50);
        });
    }
}
