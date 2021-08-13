import { DomNode, el, Popup } from "@hanul/skynode";

export default class NurseDetail extends Popup {

    public content: DomNode;

    constructor() {
        super(".nurse-detail");
        this.append(
            this.content = el(".content",
            ),
        );
    }
}
