import { DomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
import LingerieGirlsContract from "../../../contracts/LingerieGirlsContract";
import LingerieGirl from "./LingerieGirl";

export default class LingerieGirlList extends DomNode {

    constructor() {
        super(".lingeriegirl-list");
        this.loadLingerieGirls();
    }

    private async loadLingerieGirls() {

        const count = (await LingerieGirlsContract.getTotalSupply()).toNumber();

        SkyUtil.repeat(count, (id) => {
            setTimeout(() => {
                if (this.deleted !== true) {
                    new LingerieGirl(id).appendTo(this);
                }
            }, id * 50);
        });
    }
}
