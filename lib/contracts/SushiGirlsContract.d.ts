import { BigNumber, BigNumberish } from "ethers";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { SushiGirls } from "./typechain";
export interface SushiGirlInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}
declare class SushiGirlsContract extends ERC721EnumerableContract<SushiGirls> {
    constructor();
    getSushiGirl(sushiGirlsId: number): Promise<SushiGirlInfo>;
    ownerOf(sushiGirlsId: number): Promise<string>;
    powerOf(sushiGirlsId: number): Promise<number>;
    mint(power: BigNumberish): Promise<void>;
    support(id: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
}
declare const _default: SushiGirlsContract;
export default _default;
//# sourceMappingURL=SushiGirlsContract.d.ts.map