import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
import { NurseRaid } from "./typechain";
export interface RaidInfo {
    entranceFee: BigNumber;
    nursePart: number;
    maxRewardCount: number;
    duration: number;
    endBlock: number;
}
export interface ChallengerInfo {
    enterBlock: number;
    maids: string;
    maidId: BigNumber;
}
declare class NurseRaidContract extends Contract<NurseRaid> {
    constructor();
    getRaidCount(): Promise<BigNumber>;
    getRaid(raidId: number): Promise<RaidInfo>;
    getChallenger(raidId: number, owner: string): Promise<ChallengerInfo>;
    checkDone(raidId: number): Promise<boolean | undefined>;
    create(entranceFee: BigNumberish, nursePart: BigNumberish, maxRewardCount: BigNumberish, duration: BigNumberish, endBlock: BigNumberish): Promise<void>;
    enter(raidId: number, maids: string, maidId?: number): Promise<void>;
    exit(raidId: number): Promise<void>;
}
declare const _default: NurseRaidContract;
export default _default;
//# sourceMappingURL=NurseRaidContract.d.ts.map