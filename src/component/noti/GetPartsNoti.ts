import { BodyNode, DomNode, el } from "@hanul/skynode";
import StaticDataManager from "../../StaticDataManager";

export default class GetPartsNoti extends DomNode {

    constructor(partType: number, count: number) {
        super(".get-parts-noti");
        const nurseType = StaticDataManager.getNurseType(partType);
        this.append(
            el(".close-button",
                el("img", { src: "/images/component/noti/close-button.png" }, {
                    click: () => this.delete(),
                }),
            ),
            el("h4", "Raid Completed"),
            el("p", "You've got"),
            el(".parts",
                el("img", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType.name}.png`, height: "60" }),
                el(".count", `x ${count}`),
            ),
        );
        this.appendTo(BodyNode);
    }
}
