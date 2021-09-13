import { DomNode, el, Popup } from "@hanul/skynode";

export default class CreateNursePopup extends Popup {

    public content: DomNode;

    constructor(private nurseType: number) {
        super(".popup-background");

        this.append(
            this.content = el(".create-nurse-popup",
                el("h1", "Create Nurse"),
                el("a.close-button", el("img", { src: "/images/component/nurse-battery-popup/close-button.png", height: "25" }), {
                    click: () => this.delete(),
                }),
            ),
        );

        this.load();
    }

    private async load() {
    }
}
