import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import Alert from "./Alert";
import Dialogue from "./Dialogue";

export default class TokenPrompt extends Dialogue {

    private input: DomNode<HTMLInputElement>;

    constructor(
        title: string,
        message: string,
        confirmTitle: string,
        min: BigNumberish,
        balance: BigNumberish,
        confirm: (value: BigNumber) => void,
    ) {
        super(".token-prompt", title, confirmTitle, () => {
            const value = utils.parseEther(this.input.domElement.value);
            if (value.lt(min)) {
                new Alert("Error", `Minimum value is ${utils.formatEther(min)}`, "Confirm");
                return false;
            } else if (value.gt(balance)) {
                new Alert("Error", `Balance is ${utils.formatEther(balance)}`, "Confirm");
                return false;
            } else {
                confirm(value);
            }
        });
        this.content.append(
            el("p", message),
            this.input = el("input.input", { placeholder: `Balance: ${utils.formatEther(balance)}` }),
            el("a.max-button", "Max", {
                click: () => this.input.domElement.value = utils.formatEther(balance),
            }),
        );
        this.input.domElement.focus();
    }
}
