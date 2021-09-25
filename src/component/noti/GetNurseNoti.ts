import { BodyNode, DomNode, el } from "@hanul/skynode";
import StaticDataManager from "../../StaticDataManager";

export default class GetNurseNoti extends DomNode {

    constructor(_nurseType: number) {
        super(".get-nurse-noti");
        const nurseType = StaticDataManager.getNurseType(_nurseType);
        this.append(
            el(".close-button",
                el("img", { src: "/images/component/noti/close-button.png" }, {
                    click: () => this.delete(),
                }),
            ),
            el("h4", "Assemble Completed"),
            el("p", "You've got"),
            el("img.nurse", { src: `https://storage.googleapis.com/maidcoin/Nurse/Illust/${nurseType.name}.png`, height: "60" }),
        );
        this.appendTo(BodyNode);
    }
}
