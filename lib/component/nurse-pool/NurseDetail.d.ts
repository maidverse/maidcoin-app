import { DomNode, Popup } from "@hanul/skynode";
export default class NurseDetail extends Popup {
    private nurseId;
    content: DomNode;
    private lifetime;
    private supportedPower;
    private pendingReward;
    private currentBlockNumber;
    private endBlock;
    constructor(nurseId: number);
    private refreshLifetime;
    private elongateLifetimeHandler;
    private changeSupportedPowerHandler;
    private claimHandler;
    private load;
    delete(): void;
}
//# sourceMappingURL=NurseDetail.d.ts.map