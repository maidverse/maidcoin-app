import { DomNode, el } from "@hanul/skynode";

export default class AnyHousekeeperList extends DomNode {

    private content: DomNode;

    constructor() {
        super(".any-housekeeper-list");
        this.append(
            el(".background"),
            this.content = el(".content"),
        );
        this.loadHousekeepers();
    }

    private async loadHousekeepers() {

    }
}
