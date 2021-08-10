import { DomNode, el, Popup } from "@hanul/skynode";

export default class SlidePrompt extends Popup {

    public content: DomNode;

    constructor() {
        super(".background");
        this.append(this.content = el(".slide-prompt"));
    }
}
