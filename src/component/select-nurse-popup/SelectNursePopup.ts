import { DomNode, el, Popup } from "@hanul/skynode";

export default class SelectNursePopup extends Popup {

    public content: DomNode;

    constructor() {
        super(".popup-background");

        this.append(
            this.content = el(".select-nurse-popup",
                el("h1", "Select Nurse"),
                el("a.close-button", el("img", { src: "/images/component/select-nurse-popup/close-button.png", height: "25" }), {
                    click: () => this.delete(),
                }),
                el("main",
                ),
                el("footer"),
            ),
        );

        this.load();
    }

    private async load() {
    }
}
