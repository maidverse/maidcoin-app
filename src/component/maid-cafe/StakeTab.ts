import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import MaidCafeContract from "../../contracts/MaidCafeContract";

export default class StakeTab extends DomNode {

    private input: DomNode<HTMLInputElement>;

    constructor() {
        super(".tab.stake-tab");
        this.append(
            el(".input-container",
                this.input = el("input"),
                el("a.max-button", "Max"),
            ),
            el("a.stake-button", "Stake", {
                click: async () => {
                    await MaidCafeContract.enter(utils.parseEther(this.input.domElement.value));
                },
            }),
        );
        this.loadBalance();
    }

    private async loadBalance() {
        //TODO:
    }
}
