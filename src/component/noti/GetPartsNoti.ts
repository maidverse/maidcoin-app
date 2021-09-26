import { BodyNode, DomNode, el } from "@hanul/skynode";
import StaticDataManager from "../../StaticDataManager";

export default class GetPartsNoti extends DomNode {

    private closeTimeout: number;

    constructor(partType: number, count: number) {
        super(".get-parts-noti");
        const nurseType = StaticDataManager.getNurseType(partType);
        this.append(
            el("a.close-button",
                el("img", { src: "/images/component/noti/close-button.png", height: "19.5" }, {
                    click: () => this.delete(),
                }),
            ),
            el("h4", "Raid Completed"),
            el(".reward",
                el("p", "You've got"),
                el(".parts",
                    el("img", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType.name}.png`, height: "60" }),
                    el(".count", `x ${count}`),
                ),
            ),
        );
        this.appendTo(BodyNode);

        this.closeTimeout = setTimeout(() => this.close(), 5000) as any;
    }

    private close() {
        clearTimeout(this.closeTimeout);
        this.addClass("hide");
        setTimeout(() => this.delete(), 1000);
    }
}
