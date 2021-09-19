import { DomNode } from "@hanul/skynode";
import NurseList from "./NurseList";
export default class Nurse extends DomNode {
    nurseId: number;
    private lifetime;
    private currentBlockNumber;
    private endBlock;
    private supportedPower;
    private destroyReturn;
    constructor(nurseList: NurseList, nurseId: number);
    private refreshLifetime;
    private load;
}
//# sourceMappingURL=Nurse.d.ts.map