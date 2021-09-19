import { DomNode, el, Popup } from "@hanul/skynode";

export default class ChargeMultipleNursePopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");
        this.append(
            this.content = el(".charge-multiple-nurse-popup",
            ),
        );
    }
}
