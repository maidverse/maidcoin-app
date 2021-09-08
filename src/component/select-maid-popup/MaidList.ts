import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import MaidsContract from "../../contracts/MaidsContract";
import Wallet from "../../ethereum/Wallet";
import Maid from "./Maid";

export default class MaidList extends DomNode {

    private content: DomNode;
    private selectedMaid: Maid | undefined;

    constructor() {
        super(".any-housekeeper-list");
        this.append(
            el(".background"),
            this.content = el(".content"),
        );
        this.loadMaids();
    }

    private async loadMaids() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const maidCount = (await MaidsContract.balanceOf(owner)).toNumber();

            SkyUtil.repeat(maidCount, async (index) => {
                if (this.deleted !== true) {
                    const maidIndex = maidCount - index - 1;
                    const maidId = (await MaidsContract.getTokenOfOwnerByIndex(owner, maidIndex)).toNumber();
                    const maid = new Maid(maidId).appendTo(this.content);
                    maid.on("select", () => {
                        if (maid === this.selectedMaid) {
                            this.deselectMaid();
                            this.fireEvent("deselect");
                        } else {
                            this.selectedMaid?.deselect();
                            this.selectedMaid = maid;
                            this.fireEvent("select", maidId);
                        }
                    });
                }
            });
        }
    }

    public deselectMaid() {
        this.selectedMaid?.deselect();
        this.selectedMaid = undefined;
    }
}
