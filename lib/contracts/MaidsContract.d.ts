import { BigNumber, BigNumberish } from "ethers";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { Maids } from "./maidcoin/typechain";
export interface MaidInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}
declare class MaidsContract extends ERC721EnumerableContract<Maids> {
    constructor();
    getMaid(maidId: number): Promise<MaidInfo>;
    ownerOf(maidId: number): Promise<string>;
    powerOf(maidId: number): Promise<number>;
    mint(power: BigNumberish): Promise<void>;
    support(id: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
}
declare const _default: MaidsContract;
export default _default;
//# sourceMappingURL=MaidsContract.d.ts.map