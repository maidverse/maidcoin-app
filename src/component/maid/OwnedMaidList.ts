import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import MaidContract from "../../contracts/MaidContract";
import Wallet from "../../ethereum/Wallet";
import Loading from "../Loading";
import MaidSummary from "./MaidSummary";

export default class OwnedMaidList extends DomNode {

    private loading: Loading;
    private maidContainer: DomNode;

    constructor() {
        super(".owned-maid-list");
        this.append(
            this.loading = new Loading(),
            this.maidContainer = el(".maid-container"),
        );
        this.loadMaids();
    }

    private async loadMaids() {

        new MaidSummary(0).appendTo(this.maidContainer);

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const maidCount = (await MaidContract.balanceOf(owner)).toNumber();

            SkyUtil.repeat(maidCount, (index) => {
                setTimeout(async () => {
                    if (this.deleted !== true) {
                        const maidIndex = maidCount - index - 1;
                        const maidId = (await MaidContract.getTokenOfOwnerByIndex(owner, maidIndex)).toNumber();
                        new MaidSummary(maidId).appendTo(this.maidContainer);
                    }
                }, index * 50);
            });
        }

        this.loading.delete();
    }
}
