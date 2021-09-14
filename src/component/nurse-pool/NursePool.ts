import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import superagent from "superagent";
import Nurse from "./Nurse";

export default class NursePool extends DomNode {

    private content: DomNode;

    constructor(private nurseType: number, private nurseIds: number[]) {
        super(".nurse-pool");
        this.append(
            el(".background"),
            this.content = el(".content"),
        );
        this.load();
    }

    private async load() {

        const result = await superagent.get(`https://api.maidcoin.org/nursetypes/${this.nurseType}`);
        const tokenInfo = result.body;

        let nurseList;
        this.content.empty().append(
            el("header",
                el(".background"),
                el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${tokenInfo.name}.png` }),
                el("h3", tokenInfo.name),
            ),
            nurseList = el(".nurse-list"),
        );

        for (const nurseId of this.nurseIds) {
            const nurse = new Nurse(nurseId).appendTo(nurseList);
            nurse.style({
                width: this.content.rect.width / this.nurseIds.length,
                paddingBottom: SkyUtil.random(0, 10),
            });
        }
    }
}
