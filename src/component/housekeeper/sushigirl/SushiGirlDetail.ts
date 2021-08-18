import { DomNode, el, Popup } from "@hanul/skynode";

export default class SushiGirlDetail extends Popup {

    public content: DomNode;

    constructor() {
        super(".sushigirl-detail");
        this.append(
            this.content = el(".content",
            ),
        );
    }
}
