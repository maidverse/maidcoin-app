import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";

export default class NursePart extends DomNode {

    constructor(private nurseType: number, private nursePartCount: number) {
        super(".nurse-part");
        this.load();
    }

    private async load() {
        const result = await superagent.post(`https://api.maidcoin.org/nurseparts/${this.nurseType}`);
        const tokenInfo = result.body;

        this.append(
            el("img.part", { src: tokenInfo.image, height: "60" }),
            el("span.count", String(this.nursePartCount)),
        );
    }
}
