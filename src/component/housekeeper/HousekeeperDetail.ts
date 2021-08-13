import { DomNode, el, Popup } from "@hanul/skynode";

export default class HousekeeperDetail extends Popup {

    public content: DomNode;

    constructor() {
        super(".housekeeper-detail");
        this.append(
            this.content = el(".content",
            ),
        );
    }
}
