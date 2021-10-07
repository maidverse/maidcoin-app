import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, Popup } from "@hanul/skynode";
export default class EarnFromFarmPopup extends Popup {
    private tx;
    private amount;
    private apr;
    content: DomNode;
    constructor(tx: string, amount: BigNumber, apr: BigNumber);
    private load;
}
//# sourceMappingURL=EarnFromFarmPopup.d.ts.map