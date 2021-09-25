import { BodyNode, DomNode, el } from "@hanul/skynode";

export default class Noti extends DomNode {

    constructor(title: string, message: string) {
        super(".noti");
        this.append(
            el(".close-button",
                el("img", { src: "/images/component/noti/close-button.png" }, {
                    click: () => this.delete(),
                }),
            ),
            el("h4", title),
            el("p", message),
        );
        this.appendTo(BodyNode);
    }
}
