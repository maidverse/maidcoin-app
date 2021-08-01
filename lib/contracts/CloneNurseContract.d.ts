import { BigNumber, BigNumberish } from "ethers";
import ERC721Contract from "./standard/ERC721Contract";
import { CloneNurse } from "./typechain";
interface NurseType {
    partCount: number;
    destroyReturn: BigNumber;
    power: number;
}
interface NurseInfo {
    nurseType: number;
}
declare class CloneNurseContract extends ERC721Contract<CloneNurse> {
    constructor();
    getNurseTypeCount(): Promise<BigNumber>;
    addNurseType(partCount: BigNumberish, destroyReturn: BigNumber, power: BigNumberish): Promise<void>;
    getNurseType(nurseType: number): Promise<NurseType>;
    ownerOf(nurseId: number): Promise<string>;
    getNurse(nurseId: number): Promise<NurseInfo>;
    getSupportedPower(nurseId: number): Promise<BigNumber>;
    getSupportingTo(supporter: string): Promise<BigNumber>;
    getPendigReward(nurseId: BigNumberish): Promise<BigNumber>;
    assemble(nurseType: number): Promise<void>;
    claim(nurseId: BigNumberish): Promise<void>;
}
declare const _default: CloneNurseContract;
export default _default;
//# sourceMappingURL=CloneNurseContract.d.ts.map