import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import MaidsContract from "../../contracts/MaidsContract";
import Wallet from "../../ethereum/Wallet";
import Loading from "../Loading";
import MaidSummary from "./MaidSummary";

export default class OwnedMaidList extends DomNode {

    private loading: Loading | undefined;
    private maidContainer: DomNode;

    constructor() {
        super(".owned-maid-list");
        this.append(
            this.loading = new Loading(),
            this.maidContainer = el(".maid-container"),
        );
        this.loadMaids();
        Wallet.on("connect", this.connectHandler);
    }

    private connectHandler = () => {
        if (this.loading === undefined) {
            this.loadMaids();
        }
    };

    private async loadMaids() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const maidCount = (await MaidsContract.balanceOf(owner)).toNumber();

            SkyUtil.repeat(maidCount, (index) => {
                setTimeout(async () => {
                    const maidIndex = maidCount - index - 1;
                    const maidId = (await MaidsContract.getTokenOfOwnerByIndex(owner, maidIndex)).toNumber();

                    if (this.deleted !== true) {
                        new MaidSummary(maidId).appendTo(this.maidContainer);
                    }
                }, index * 50);
            });
        }

        if (this.deleted !== true) {
            this.loading?.delete();
            this.loading = undefined;
        }
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        super.delete();
    }
}
