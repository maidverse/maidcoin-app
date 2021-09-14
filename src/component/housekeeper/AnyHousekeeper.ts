import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";
import LingerieGirlDetail from "./lingeriegirl/LingerieGirlDetail";
import SushiGirlDetail from "./sushigirl/SushiGirlDetail";

export default class AnyHousekeeper extends DomNode {

    constructor(public type: string, public id: number, private selectable: boolean) {
        super(".any-housekeeper");
        this.load();
        if (selectable === true) {
            this.onDom("click", () => {
                this.addClass("selected");
                this.fireEvent("select");
            });
        }
    }

    private async load() {

        if (this.type === "LingerieGirl") {
            const result = await superagent.get(`https://api.maidcoin.org/lingeriegirls/${this.id}`);
            const tokenInfo = result.body;
            this.append(
                el("img.image", { src: `https://storage.googleapis.com/maidcoin/LingerieGirl/Face/${this.id}.png` }),
                el(".name", tokenInfo.name),
            );
            if (this.selectable !== true) {
                this.onDom("click", () => new SushiGirlDetail(this.id));
            }
        }

        else if (this.type === "SushiGirl") {
            const result = await superagent.get(`https://api.maidcoin.org/sushigirls/${this.id}`);
            const tokenInfo = result.body;
            this.append(
                el("img.image", { src: `https://storage.googleapis.com/maidcoin/SushiGirl/Face/${this.id}.png` }),
                el(".name", tokenInfo.name),
            );
            if (this.selectable !== true) {
                this.onDom("click", () => new LingerieGirlDetail(this.id));
            }
        }
    }

    public deselect() {
        this.deleteClass("selected");
    }
}
