import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import NurseList from "./NurseList";

export default class RouteNursePopup extends Popup {

    public content: DomNode;

    constructor(supportedLP: BigNumber, route: (toNurseId: number) => void) {
        super(".popup-background");

        let addressInput: DomNode<HTMLInputElement>;
        let nurseList: NurseList;

        this.append(
            this.content = el(".route-nurse-popup",
                el("h1", "Route Nurse"),
                el("a.close-button", el("img", { src: "/images/component/route-nurse-popup/close-button.png", height: "22.5" }), {
                    click: () => this.delete(),
                }),
                el("main",
                    el(".search",
                        addressInput = el("input", { placeholder: "0x12345..." }),
                        el("a.search-button", el("img", { src: "/images/component/select-nurse-popup/search-button.png", height: "32.5" }), {
                            click: () => {
                                const address = addressInput.domElement.value.trim();
                                if (address === "") {
                                    nurseList.loadAllNurses();
                                } else {
                                    nurseList.find(address);
                                }
                            },
                        }),
                    ),
                    nurseList = new NurseList(),
                ),
                el("footer",
                    el("a.confirm-button",
                        "Close",
                        { click: () => this.delete() },
                    ),
                ),
            ),
        );
    }
}
