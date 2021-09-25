import { DomNode } from "@hanul/skynode";
export default class NurseRaid extends DomNode {
    raidId: number;
    private content;
    private footer;
    private durationInterval;
    constructor(raidId: number, currentBlockNumber: number);
    private connectHandler;
    private enterHandler;
    private exitHandler;
    private getLeftBlocks;
    checkDone(owner: string): Promise<boolean>;
    private load;
    private exit;
    delete(): void;
}
//# sourceMappingURL=NurseRaid.d.ts.map