import { DomNode } from "@hanul/skynode";
import { RaidInfo } from "../../contracts/NurseRaidContract";
export default class NurseRaid extends DomNode {
    private raidId;
    private raid;
    private currentBlockNumber;
    private content;
    private footer;
    constructor(raidId: number, raid: RaidInfo, currentBlockNumber: number);
    private enterHandler;
    private exitHandler;
    private load;
    delete(): void;
}
//# sourceMappingURL=NurseRaid.d.ts.map