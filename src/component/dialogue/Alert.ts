import { DomNode, el, Popup } from "@hanul/skynode";

export default class Alert extends Popup {

    public content: DomNode;

    constructor() {
        super(".background");
        this.append(this.content = el(".alert"));
    }
}
