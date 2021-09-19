import { DomNode, el, Popup } from "@hanul/skynode";
import NurseList from "./NurseList";

export default class ChargeMultipleNursePopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");
        this.append(
            this.content = el(".charge-multiple-nurse-popup",
                el("h1", "Charge Nurses"),
                el("a.close-button", el("img", { src: "/images/component/charge-multiple-nurse-popup/close-button.png", height: "22.5" }), {
                    click: () => this.delete(),
                }),
                new NurseList(),
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
