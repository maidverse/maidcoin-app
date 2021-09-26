import { BodyNode, DomNode, el } from "@hanul/skynode";
import StaticDataManager from "../../StaticDataManager";

export default class GetNurseNoti extends DomNode {

    private closeTimeout: number;

    constructor(_nurseType: number) {
        super(".get-nurse-noti");
        const nurseType = StaticDataManager.getNurseType(_nurseType);
        this.append(
            el("a.close-button",
                el("img", { src: "/images/component/noti/close-button.png", height: "19.5" }, {
                    click: () => this.delete(),
                }),
            ),
            el("h4", "Assemble Completed"),
            el(".reward",
                el("p", "You've got"),
                el("img", { src: `https://storage.googleapis.com/maidcoin/Nurse/Illust/${nurseType.name}.png`, height: "60" }),
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
