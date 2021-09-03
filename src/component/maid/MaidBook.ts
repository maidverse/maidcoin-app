import { DomNode, el } from "@hanul/skynode";
import maids from "../../json/maids.json";
import MaidDetail from "./MaidDetail";

export default class MaidBook extends DomNode {

    constructor(maidId: number) {
        super(".maid-book");
        const maidInfo = (maids as any)[maidId];
        this.style({
            backgroundImage: `url(https://storage.googleapis.com/maidcoin/Maid/Catalog/${maidInfo.name}Catalog.png)`,
        });
        this.append(el("a.name", maidInfo.name));
        this.onDom("click", () => new MaidDetail(maidId));
    }
}
