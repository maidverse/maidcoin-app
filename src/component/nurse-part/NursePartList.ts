import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import NursePartContract from "../../contracts/NursePartContract";
import Wallet from "../../ethereum/Wallet";
import ViewUtil from "../../view/ViewUtil";
import Loading from "../Loading";
import NursePart from "./NursePart";

export default class NursePartList extends DomNode {

    private content: DomNode;
    private loading: Loading | undefined;
    private plusButton: DomNode | undefined;

    constructor() {
        super(".nurse-part-list");
        this.append(
            this.loading = new Loading(),
            el(".background"),
            this.content = el(".content",
                this.plusButton = el("a.zoom-button",
                    el("img", { src: "/images/view/dashboard/plus-button.png", height: "23.5" }),
                    "Go to Nurse Raids",
                    { click: () => ViewUtil.go("/nurseraids") },
                ),
            ),
        );
        this.plusButton.on("delete", () => this.plusButton = undefined);
        this.loadNurseParts();
        Wallet.on("connect", this.connectHandler);
    }

    private connectHandler = () => {
        if (this.loading === undefined) {
            this.loadNurseParts();
        }
    };

    private async loadNurseParts() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const nurseTypeCount = (await CloneNursesContract.getNurseTypeCount()).toNumber();
            await SkyUtil.repeatAsync(nurseTypeCount, async (nurseType) => {
                const nursePartCount = (await NursePartContract.balanceOf(owner, nurseType)).toNumber();

                if (this.deleted !== true && nursePartCount > 0) {
                    this.plusButton?.delete();
                    this.content.append(new NursePart(nurseType, nursePartCount));
                }
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
