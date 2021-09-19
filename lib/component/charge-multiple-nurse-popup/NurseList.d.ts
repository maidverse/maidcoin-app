import { DomNode } from "@hanul/skynode";
export default class NurseList extends DomNode {
    constructor();
    get partCounts(): {
        [nurseId: number]: number;
    };
    loadAllNurses(): Promise<void>;
    find(owner: string): Promise<void>;
}
//# sourceMappingURL=NurseList.d.ts.map