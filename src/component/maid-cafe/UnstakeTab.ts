import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import MaidCafeContract from "../../contracts/MaidCafeContract";

export default class UnstakeTab extends DomNode {

    private input: DomNode<HTMLInputElement>;

    constructor() {
        super(".tab.unstake-tab");
        this.append(
            el(".input-container",
                this.input = el("input"),
                el("a.max-button", "Max"),
            ),
            el("a.confirm-button", "Unstake", {
                click: async () => {
                    await MaidCafeContract.leave(utils.parseEther(this.input.domElement.value));
                },
            }),
        );
        this.loadBalance();
    }

    private async loadBalance() {
        //TODO:
    }
}
