import { BigNumber, BigNumberish } from "ethers";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { SushiGirls } from "./sushigirls/typechain";
export interface SushiGirlInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}
declare class SushiGirlsContract extends ERC721EnumerableContract<SushiGirls> {
    constructor();
    getSushiGirl(id: number): Promise<SushiGirlInfo>;
    ownerOf(id: number): Promise<string>;
    powerOf(id: number): Promise<number>;
    support(id: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
}
declare const _default: SushiGirlsContract;
export default _default;
//# sourceMappingURL=SushiGirlsContract.d.ts.map