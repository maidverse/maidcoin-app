import { BigNumber, BigNumberish } from "ethers";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { CloneNurses } from "./typechain";
interface NurseType {
    partCount: number;
    destroyReturn: BigNumber;
    power: number;
}
interface NurseInfo {
    nurseType: number;
}
declare class CloneNursesContract extends ERC721EnumerableContract<CloneNurses> {
    constructor();
    getNurseTypeCount(): Promise<BigNumber>;
    addNurseType(partCount: BigNumberish, destroyReturn: BigNumber, power: BigNumberish, lifetime: BigNumberish): Promise<void>;
    getNurseType(nurseType: number): Promise<NurseType>;
    ownerOf(nurseId: number): Promise<string>;
    getNurse(nurseId: BigNumberish): Promise<NurseInfo>;
    getSupportedPower(nurseId: number): Promise<BigNumber>;
    getSupportingTo(supporter: string): Promise<BigNumber>;
    getPendigReward(nurseId: BigNumberish): Promise<BigNumber>;
    assemble(nurseType: number, partCount: number): Promise<void>;
    claim(nurseId: BigNumberish): Promise<void>;
}
declare const _default: CloneNursesContract;
export default _default;
//# sourceMappingURL=CloneNursesContract.d.ts.map