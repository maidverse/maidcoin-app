import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";

export default class NursePool extends DomNode {

    private content: DomNode;

    constructor(private nurseType: number, nurseIds: number[]) {
        super(".nurse-pool");
        this.append(
            el(".background"),
            this.content = el(".content"),
        );
        this.load();
    }

    private async load() {

        const result = await superagent.post(`https://api.maidcoin.org/nursetype/${this.nurseType}`);
        const tokenInfo = result.body;

        this.content.empty().append(
            el("header",
                el(".background"),
                el("h3", tokenInfo.name),
            ),
        );
    }
}
