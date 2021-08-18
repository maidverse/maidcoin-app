import { DomNode, el } from "@hanul/skynode";

export default class NursePart extends DomNode {

    constructor(nurseType: number, nursePartCount: number) {
        super(".nurse-part");
        this.append(
            el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType}.png`, height: "60" }),
            el("span.count", String(nursePartCount)),
        );
    }
}
