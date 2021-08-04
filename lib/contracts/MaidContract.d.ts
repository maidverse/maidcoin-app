import { BigNumber, BigNumberish } from "ethers";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { Maid } from "./typechain";
export interface MaidInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}
declare class MaidContract extends ERC721EnumerableContract<Maid> {
    constructor();
    getMaid(maidId: number): Promise<MaidInfo>;
    ownerOf(nurseId: number): Promise<string>;
    mint(power: BigNumberish): Promise<void>;
    support(id: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
}
declare const _default: MaidContract;
export default _default;
//# sourceMappingURL=MaidContract.d.ts.map