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
        max: BigNumberish,
        confirm: (value: BigNumber) => void,
    ) {
        super(".token-prompt", title, confirmTitle, () => {
            const value = utils.parseEther(this.input.domElement.value);
            if (value.lt(min)) {
                new Alert("Error", `Minimum value is ${utils.formatEther(min)}`, "Confirm");
                return false;
            } else if (value.gt(max)) {
                new Alert("Error", `Maximum value is ${utils.formatEther(max)}`, "Confirm");
                return false;
            } else {
                confirm(value);
            }
        });
        this.content.append(
            el("p", message),
            this.input = el("input.input", { value: utils.formatEther(min) }),
        );
        this.input.domElement.select();
    }
}
