import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";
import SushiGirlDetail from "./SushiGirlDetail";

export default class SushiGirl extends DomNode {

    constructor(private sushiGirlId: number) {
        super(".sushigirl");
        this.load();
        this.onDom("click", () => new SushiGirlDetail(sushiGirlId));
    }

    private async load() {
        const result = await superagent.post(`https://api.maidcoin.org/sushigirls/${this.sushiGirlId}`);
        const tokenInfo = result.body;

        this.empty().append(
            el("img.image", { src: tokenInfo.face_image }),
            el(".name", tokenInfo.name),
        );
    }
}
