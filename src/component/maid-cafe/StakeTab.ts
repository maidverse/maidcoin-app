import { DomNode, el } from "@hanul/skynode";

export default class StakeTab extends DomNode {

    constructor() {
        super(".tab.stake-tab");
        this.append(
            el(".input-container",
                el("input"),
                el("a.max-button", "Max"),
            ),
            el("a.stake-button", "Stake"),
        );
        this.loadBalance();
    }

    private async loadBalance() {
        //TODO:
    }
}
