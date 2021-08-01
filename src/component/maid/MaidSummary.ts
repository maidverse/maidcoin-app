import { DomNode } from "@hanul/skynode";

export default class MaidSummary extends DomNode {

    constructor(private maidId: number) {
        super(".maid-summary");
    }
}
