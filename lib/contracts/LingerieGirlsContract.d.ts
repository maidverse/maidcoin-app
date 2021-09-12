import { BigNumber, BigNumberish } from "ethers";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { LingerieGirls } from "./lingeriegirls/typechain";
export interface SushiGirlInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}
declare class LingerieGirlsContract extends ERC721EnumerableContract<LingerieGirls> {
    constructor();
    getSushiGirl(sushiGirlsId: number): Promise<SushiGirlInfo>;
    ownerOf(sushiGirlsId: number): Promise<string>;
    powerOf(sushiGirlsId: number): Promise<number>;
    mint(power: BigNumberish): Promise<void>;
    support(id: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
}
declare const _default: LingerieGirlsContract;
export default _default;
//# sourceMappingURL=LingerieGirlsContract.d.ts.map