import { DomNode, el } from "@hanul/skynode";

export default class Loading extends DomNode {

    constructor() {
        super(".loading");
        this.append(el("img", {
            src: "https://storage.googleapis.com/maidcoin/loading.png",
            height: "140",
        }));
    }
}
