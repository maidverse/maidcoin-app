import { DomNode } from "@hanul/skynode";
import { RaidInfo } from "../../contracts/NurseRaidContract";
export default class NurseRaid extends DomNode {
    private raidId;
    private raid;
    private currentBlockNumber;
    private content;
    private footer;
    constructor(raidId: number, raid: RaidInfo, currentBlockNumber: number);
    private load;
}
//# sourceMappingURL=NurseRaid.d.ts.map