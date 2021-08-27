import { BigNumber, BigNumberish } from "ethers";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { SushiGirls } from "./typechain";
export interface SushiGirlsInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}
declare class SushiGirlsContract extends ERC721EnumerableContract<SushiGirls> {
    constructor();
    getSushiGirls(sushiGirlsId: number): Promise<SushiGirlsInfo>;
    ownerOf(sushiGirlsId: number): Promise<string>;
    powerOf(sushiGirlsId: number): Promise<number>;
    mint(power: BigNumberish): Promise<void>;
    support(id: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
}
declare const _default: SushiGirlsContract;
export default _default;
//# sourceMappingURL=SushiGirlsContract.d.ts.map