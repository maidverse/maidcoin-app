import { DomNode, el, Popup } from "@hanul/skynode";

export default class Prompt extends Popup {

    public content: DomNode;

    constructor() {
        super(".background");
        this.append(this.content = el(".prompt"));
    }
}
