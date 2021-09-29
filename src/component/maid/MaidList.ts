import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import MaidsContract from "../../contracts/MaidsContract";
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

        const maidCount = (await MaidsContract.getTotalSupply()).toNumber();

        if (maidCount === 0) {
            this.append(el(".ready", "There is no Maid yet. Maid will be issued when Shoyu is released on SushiSwap."));
        }

        SkyUtil.repeat(maidCount, (index) => {
            setTimeout(() => {
                if (this.deleted !== true) {
                    new MaidBook(maidCount - index - 1).appendTo(this.maidContainer);
                }
            }, index * 50);
        });

        this.loading.delete();
    }
}
