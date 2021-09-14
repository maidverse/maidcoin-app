import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";

export default class Maid extends DomNode {

    constructor(public maidId: number) {
        super(".maid");
        this.load();
        this.onDom("click", () => {
            this.addClass("selected");
            this.fireEvent("select");
        });
    }

    private async load() {
        const result = await superagent.get(`https://api.maidcoin.org/maids/${this.maidId}`);
        const tokenInfo = result.body;

        this.empty().append(
            el("img.image", { src: `https://storage.googleapis.com/maidcoin/Maid/Face/${this.maidId}.png` }),
            el(".name", tokenInfo.name),
        );
    }

    public deselect() {
        this.deleteClass("selected");
    }
}
