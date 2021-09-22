import { DomNode, el, Popup } from "@hanul/skynode";
import NurseList from "./NurseList";

export default class SelectNursePopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");

        let addressInput: DomNode<HTMLInputElement>;
        let nurseList: NurseList;

        this.append(
            this.content = el(".select-nurse-popup",
                el("h1", "Select Nurse"),
                el("a.close-button", el("img", { src: "/images/component/select-nurse-popup/close-button.png", height: "25" }), {
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

        nurseList.on("support", () => this.delete());
    }
}
