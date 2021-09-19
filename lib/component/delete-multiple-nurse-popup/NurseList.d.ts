import { BigNumber } from "@ethersproject/bignumber";
import { DomNode } from "@hanul/skynode";
export default class NurseList extends DomNode {
    checkedNurseIds: number[];
    totalSelectedSupportedPower: BigNumber;
    totalDestroyReturn: BigNumber;
    constructor();
    loadAllNurses(): Promise<void>;
    find(owner: string): Promise<void>;
}
//# sourceMappingURL=NurseList.d.ts.map