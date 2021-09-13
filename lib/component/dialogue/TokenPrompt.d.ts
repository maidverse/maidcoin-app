import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Dialogue from "./Dialogue";
export default class TokenPrompt extends Dialogue {
    private input;
    constructor(title: string, message: string, confirmTitle: string, min: BigNumberish, balance: BigNumberish, confirm: (value: BigNumber) => void);
}
//# sourceMappingURL=TokenPrompt.d.ts.map