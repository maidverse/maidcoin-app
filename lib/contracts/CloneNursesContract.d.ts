import { BigNumber, BigNumberish } from "ethers";
import { CloneNurses } from "./maidcoin/typechain";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
interface NurseInfo {
    nurseType: number;
    endBlock: number;
}
declare class CloneNursesContract extends ERC721EnumerableContract<CloneNurses> {
    constructor();
    getNurseTypeCount(): Promise<BigNumber>;
    addNurseType(partCounts: BigNumberish[], destroyReturns: BigNumber[], powers: BigNumberish[], lifetimes: BigNumberish[]): Promise<void>;
    ownerOf(nurseId: number): Promise<string>;
    getNurse(nurseId: BigNumberish): Promise<NurseInfo>;
    getSupportedPower(nurseId: number): Promise<BigNumber>;
    findSupportingTo(supporter: string): Promise<{
        owner: string;
        supportingTo: number;
    }>;
    getPendigReward(nurseId: BigNumberish): Promise<BigNumber>;
    assemble(nurseType: number, partCount: number): Promise<void>;
    elongateLifetime(ids: BigNumberish[], parts: BigNumberish[]): Promise<void>;
    claim(nurseIds: BigNumberish[]): Promise<void>;
    destroy(nurseIds: BigNumberish[], toIds: BigNumberish[]): Promise<void>;
}
declare const _default: CloneNursesContract;
export default _default;
//# sourceMappingURL=CloneNursesContract.d.ts.map