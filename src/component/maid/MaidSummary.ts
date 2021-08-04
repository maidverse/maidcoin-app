import { DomNode, el } from "@hanul/skynode";

export default class MaidSummary extends DomNode {

    constructor(private maidId: number) {
        super(".maid-summary");
        this.append(
            el(".background"),
        );
        console.log(maidId);
    }
}
