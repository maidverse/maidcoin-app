import { BodyNode, DomNode, el } from "@hanul/skynode";

export default class Noti extends DomNode {

    private closeTimeout: number;
    private closing = false;

    constructor(title: string, message: string) {
        super(".noti");
        this.append(
            el("a.close-button",
                el("img", { src: "/images/component/noti/close-button.png", height: "19.5" }, {
                    click: () => this.close(),
                }),
            ),
            el("h4", title),
            el("p", message),
        );
        this.appendTo(BodyNode);

        this.closeTimeout = setTimeout(() => this.close(), 5000) as any;
    }

    private close() {
        if (this.closing !== true) {
            this.closing = true;
            clearTimeout(this.closeTimeout);
            this.addClass("hide");
            setTimeout(() => this.delete(), 1000);
        }
    }
}
