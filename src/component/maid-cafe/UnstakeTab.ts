import { DomNode, el } from "@hanul/skynode";

export default class UnstakeTab extends DomNode {

    constructor() {
        super(".tab.unstake-tab");
        this.append(
            el(".input-container",
                el("input"),
                el("a.max-button", "Max"),
            ),
            el("a.stake-button", "Unstake"),
        );
        this.loadBalance();
    }

    private async loadBalance() {
        //TODO:
    }
}
