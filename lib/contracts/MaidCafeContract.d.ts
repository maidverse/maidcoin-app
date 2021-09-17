import { BigNumberish } from "@ethersproject/bignumber";
import { MaidCafe } from "./maidcoin/typechain";
import ERC20Contract from "./standard/ERC20Contract";
declare class MaidCafeContract extends ERC20Contract<MaidCafe> {
    constructor();
    enter(amount: BigNumberish): Promise<void>;
    leave(share: BigNumberish): Promise<void>;
}
declare const _default: MaidCafeContract;
export default _default;
//# sourceMappingURL=MaidCafeContract.d.ts.map