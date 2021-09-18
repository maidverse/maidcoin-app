import { BigNumber, BigNumberish } from "ethers";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { SushiGirls } from "./sushigirls/typechain";
declare class SushiGirlsContract extends ERC721EnumerableContract<SushiGirls> {
    constructor();
    getSupportedLP(id: number): Promise<BigNumber>;
    ownerOf(id: number): Promise<string>;
    support(id: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
}
declare const _default: SushiGirlsContract;
export default _default;
//# sourceMappingURL=SushiGirlsContract.d.ts.map