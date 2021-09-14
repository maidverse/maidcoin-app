import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";
import SushiGirlDetail from "./SushiGirlDetail";

export default class SushiGirl extends DomNode {

    constructor(private id: number) {
        super(".sushigirl");
        this.load();
        this.onDom("click", () => new SushiGirlDetail(id));
    }

    private async load() {
        const result = await superagent.get(`https://api.maidcoin.org/sushigirls/${this.id}`);
        const tokenInfo = result.body;

        this.empty().append(
            el("img.image", { src: `https://storage.googleapis.com/maidcoin/SushiGirl/Face/${this.id}.png` }),
            el(".name", tokenInfo.name),
        );
    }
}
