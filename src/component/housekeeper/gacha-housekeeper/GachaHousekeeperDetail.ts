import { DomNode, el, Popup } from "@hanul/skynode";

export default class GachaHousekeeperDetail extends Popup {

    public content: DomNode;

    constructor() {
        super(".gacha-housekeeper-detail");
        this.append(
            this.content = el(".content",
            ),
        );
    }
}
