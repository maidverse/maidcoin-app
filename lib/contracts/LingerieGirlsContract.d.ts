import { BigNumber, BigNumberish } from "ethers";
import { LingerieGirls } from "./lingeriegirls/typechain";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
declare class LingerieGirlsContract extends ERC721EnumerableContract<LingerieGirls> {
    constructor();
    getSupportedLP(id: number): Promise<BigNumber>;
    ownerOf(id: number): Promise<string>;
    support(id: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
    desupport(id: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
}
declare const _default: LingerieGirlsContract;
export default _default;
//# sourceMappingURL=LingerieGirlsContract.d.ts.map