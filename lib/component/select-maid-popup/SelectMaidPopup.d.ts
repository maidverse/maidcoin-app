import { DomNode, Popup } from "@hanul/skynode";
import { RaidInfo } from "../../contracts/NurseRaidContract";
export default class SelectMaidPopup extends Popup {
    private raidId;
    private raid;
    content: DomNode;
    private footer;
    private selectedSupporter;
    constructor(raidId: number, raid: RaidInfo);
    private load;
}
//# sourceMappingURL=SelectMaidPopup.d.ts.map