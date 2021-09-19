import { DomNode, el, Popup } from "@hanul/skynode";

export default class RouteNursePopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");
        this.append(
            this.content = el(".route-nurse-popup",
            ),
        );
    }
}
