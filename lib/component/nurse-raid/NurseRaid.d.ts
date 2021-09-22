import { DomNode } from "@hanul/skynode";
export default class NurseRaid extends DomNode {
    raidId: number;
    private currentBlockNumber;
    private content;
    private footer;
    done: boolean;
    constructor(raidId: number, currentBlockNumber: number);
    private enterHandler;
    private exitHandler;
    private load;
    delete(): void;
}
//# sourceMappingURL=NurseRaid.d.ts.map