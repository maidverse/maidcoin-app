import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import Dialogue from "./Dialogue";
export default class SlidePrompt extends Dialogue {
    private input;
    constructor(title: string, message: string, confirmTitle: string, min: BigNumberish, max: BigNumberish, confirm: (value: BigNumber) => void);
}
//# sourceMappingURL=SlidePrompt.d.ts.map