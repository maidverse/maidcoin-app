import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import RouteNursePopup from "../route-nurse-popup/RouteNursePopup";
import NurseList from "./NurseList";

export default class DeleteMultipleNursePopup extends Popup {

    public content: DomNode;
    private destroyReturn: DomNode;

    constructor() {
        super(".popup-background");

        let nurseList: NurseList;
        this.append(
            this.content = el(".delete-multiple-nurse-popup",
                el("h1", "Destroy Nurses"),
                el("a.close-button", el("img", { src: "/images/component/delete-multiple-nurse-popup/close-button.png", height: "22.5" }), {
                    click: () => this.delete(),
                }),
                nurseList = new NurseList(),
                el("footer",
                    el(".destroy-return",
                        el("img", { src: "/images/component/delete-multiple-nurse-popup/maidcoin.png", height: "20.5" }),
                        this.destroyReturn = el("span.amount", "+ 0"),
                    ),
                    el("a.delete-button",
                        "Destroy",
                        {
                            click: () => {
                                new RouteNursePopup(nurseList.totalSelectedSupportedPower, async (toNurseId: number) => {
                                    await CloneNursesContract.destroy(nurseList.checkedNurseIds, [toNurseId]);
                                    this.delete();
                                });
                            },
                        },
                    ),
                ),
            ),
        );

        nurseList.on("toggle", () => {
            this.destroyReturn.empty().appendText(`+ ${CommonUtil.displayPrice(nurseList.totalDestroyReturn)}`);
        });
    }
}
