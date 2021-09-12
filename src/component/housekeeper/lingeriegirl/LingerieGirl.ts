import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";
import LingerieGirlDetail from "./LingerieGirlDetail";

export default class LingerieGirl extends DomNode {

    constructor(private id: number) {
        super(".lingeriegirl");
        this.load();
        this.onDom("click", () => new LingerieGirlDetail(id));
    }

    private async load() {
        const result = await superagent.post(`https://api.maidcoin.org/lingeriegirls/${this.id}`);
        const tokenInfo = result.body;

        this.empty().append(
            el("img.image", { src: `https://storage.googleapis.com/maidcoin/LingerieGirl/Face/${this.id}.png` }),
            el(".name", tokenInfo.name),
        );
    }
}
