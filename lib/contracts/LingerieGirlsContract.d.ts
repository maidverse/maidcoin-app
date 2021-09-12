import { BigNumber, BigNumberish } from "ethers";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { LingerieGirls } from "./lingeriegirls/typechain";
export interface LingerieGirlInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}
declare class LingerieGirlsContract extends ERC721EnumerableContract<LingerieGirls> {
    constructor();
    getLingerieGirl(id: number): Promise<LingerieGirlInfo>;
    ownerOf(id: number): Promise<string>;
    powerOf(id: number): Promise<number>;
    support(id: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
}
declare const _default: LingerieGirlsContract;
export default _default;
//# sourceMappingURL=LingerieGirlsContract.d.ts.map