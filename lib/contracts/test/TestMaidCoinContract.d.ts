import { BigNumberish } from "ethers";
import { TestLPToken } from "../maidcoin/typechain";
import ERC20Contract from "../standard/ERC20Contract";
declare class TestMaidCoinContract extends ERC20Contract<TestLPToken> {
    constructor();
    mint(amount: BigNumberish): Promise<void>;
}
declare const _default: TestMaidCoinContract;
export default _default;
//# sourceMappingURL=TestMaidCoinContract.d.ts.map