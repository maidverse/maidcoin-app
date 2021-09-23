import { DomNode } from "@hanul/skynode";
import NurseList from "./NurseList";
export default class Nurse extends DomNode {
    nurseId: number;
    private owner;
    private lifetime;
    private supportedPowerDisplay;
    private currentBlockNumber;
    private endBlock;
    private supportedPower;
    private destroyReturn;
    constructor(nurseList: NurseList, nurseId: number, owner: string);
    private refreshLifetime;
    private elongateLifetimeHandler;
    private changeSupportedPowerHandler;
    private transferHandler;
    private load;
    delete(): void;
}
//# sourceMappingURL=Nurse.d.ts.map