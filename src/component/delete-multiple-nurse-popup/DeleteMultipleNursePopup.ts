import { DomNode, el, Popup } from "@hanul/skynode";

export default class DeleteMultipleNursePopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");
        this.append(
            this.content = el(".delete-multiple-nurse-popup",
            ),
        );
    }
}
