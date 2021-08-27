import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";

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
        if (this.type === "SushiGirl") {
            const result = await superagent.post(`https://api.maidcoin.org/sushigirls/${this.id}`);
            const tokenInfo = result.body;

            this.empty().append(
                el(".name", tokenInfo.name),
            );
        }
    }

    public deselect() {
        this.deleteClass("selected");
    }
}
