import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import Config from "../../Config";
import MaidContract from "../../contracts/MaidContract";
import Loading from "../Loading";
import MaidBook from "./MaidBook";

export default class MaidList extends DomNode {

    private loading: Loading;
    private maidContainer: DomNode;

    constructor() {
        super(".maid-list");
        this.append(
            this.loading = new Loading(),
            this.maidContainer = el(".maid-container"),
        );
        this.loadMaids();
    }

    private async loadMaids() {

        const maidCount = (await MaidContract.getTotalSupply()).toNumber();

        SkyUtil.repeat(maidCount, async (index) => {
            setTimeout(() => {
                if (this.deleted !== true) {
                    new MaidBook(maidCount - index - 1).appendTo(this.maidContainer);
                }
            }, index * 50);
        });

        this.loading.delete();
    }
}
