import { DomNode, el, Popup } from "@hanul/skynode";

export default class NurseBatteryPopup extends Popup {

    public content: DomNode;

    constructor(private nurseType: number) {
        super(".popup-background");

        this.append(
            this.content = el(".nurse-battery-popup",
            ),
        );

        this.load();
    }

    private async load() {
    }
}
