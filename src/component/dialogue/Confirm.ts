import { DomNode, el, Popup } from "@hanul/skynode";

export default class Confirm extends Popup {

    public content: DomNode;

    constructor() {
        super(".background");
        this.append(this.content = el(".confirm"));
    }
}
