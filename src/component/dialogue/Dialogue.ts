import { DomNode, el, Popup } from "@hanul/skynode";

export default class Dialogue extends Popup {

    public content: DomNode;

    constructor(
        tag: string,
        title: string,
        confirmTitle: string,
        confirm: () => void,
    ) {
        super(".popup-background");
        this.append(
            this.content = el(`.dialogue${tag}`,
                el("h1", title),
                el("a.close-button", el("img", { src: "/images/component/dialogue/close-button.png", height: "25" }), {
                    click: () => this.delete(),
                }),
                el("a.cancel-button", "Cancel", {
                    click: () => this.delete(),
                }),
                el("a.confirm-button", confirmTitle, {
                    click: () => {
                        confirm();
                        this.delete();
                    },
                }),
            ),
        );
    }
}
