import { DomNode, el, Popup } from "@hanul/skynode";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import NurseList from "./NurseList";

export default class ChargeMultipleNursePopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");

        let nurseList: NurseList;
        this.append(
            this.content = el(".charge-multiple-nurse-popup",
                el("h1", "Charge Nurses"),
                el("a.close-button", el("img", { src: "/images/component/charge-multiple-nurse-popup/close-button.png", height: "22.5" }), {
                    click: () => this.delete(),
                }),
                nurseList=  new NurseList(),
                el("footer",
                    el("a.confirm-button",
                        "Close",
                        { click: () => this.delete() },
                    ),
                    el("a.charge-button",
                        "Charge",
                        {
                            click: async () => {
                                const ids: number[] = [];
                                const parts: number[] = [];
                                for (const [id, partCount] of Object.entries(nurseList.partCounts)) {
                                    ids.push(parseInt(id, 10));
                                    parts.push(partCount);
                                }
                                await CloneNursesContract.elongateLifetime(ids, parts);
                                this.delete();
                            },
                        },
                    ),
                ),
            ),
        );
    }
}
