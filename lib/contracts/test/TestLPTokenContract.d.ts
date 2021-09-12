import { BigNumberish } from "ethers";
import ERC20Contract from "../standard/ERC20Contract";
import { TestLPToken } from "../maidcoin/typechain";
declare class TestLPTokenContract extends ERC20Contract<TestLPToken> {
    constructor();
    mint(amount: BigNumberish): Promise<void>;
}
declare const _default: TestLPTokenContract;
export default _default;
//# sourceMappingURL=TestLPTokenContract.d.ts.map