import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import Config from "../../Config";
import MaidBook from "./MaidBook";

export default class MaidList extends DomNode {

    private maidContainer: DomNode;

    constructor() {
        super(".maid-list");
        this.append(
            this.maidContainer = el(".maid-container"),
        );
        this.loadMaids();
    }

    private async loadMaids() {
        SkyUtil.repeat(Config.maidCount, async (maidId) => {
            new MaidBook(Config.maidCount - maidId - 1).appendTo(this.maidContainer);
        });
    }
}
