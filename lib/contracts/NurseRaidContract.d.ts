import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
import { NurseRaid } from "./maidcoin/typechain";
export interface ChallengerInfo {
    enterBlock: number;
    maids: string;
    maidId: BigNumber;
}
declare class NurseRaidContract extends Contract<NurseRaid> {
    constructor();
    getChallenger(raidId: number, owner: string): Promise<ChallengerInfo>;
    powerOfMaids(maids: string, maidId: BigNumberish): Promise<number>;
    checkDone(raidId: number): Promise<boolean | undefined>;
    create(entranceFees: BigNumberish[], nurseParts: BigNumberish[], maxRewardCounts: BigNumberish[], durations: BigNumberish[], endBlocks: BigNumberish[]): Promise<void>;
    enter(raidId: number, maids?: string, maidId?: number): Promise<void>;
    exit(raidIds: number[]): Promise<void>;
}
declare const _default: NurseRaidContract;
export default _default;
//# sourceMappingURL=NurseRaidContract.d.ts.map