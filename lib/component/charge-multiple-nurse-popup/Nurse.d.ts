import { DomNode } from "@hanul/skynode";
export default class Nurse extends DomNode {
    nurseId: number;
    private owner;
    private lifetime;
    private currentBlockNumber;
    private endBlock;
    partCount: number;
    constructor(nurseId: number, owner: string);
    private refreshLifetime;
    private elongateLifetimeHandler;
    private load;
    delete(): void;
}
//# sourceMappingURL=Nurse.d.ts.map