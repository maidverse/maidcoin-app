import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";

export default class AnyHousekeeper extends DomNode {

    constructor(private type: string, private id: number) {
        super(".any-housekeeper");
        this.load();
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
}
