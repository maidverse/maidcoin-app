import { BigNumberish } from "@ethersproject/bignumber";
import { MaidCafe } from "./maidcoin/typechain";
import ERC20Contract from "./standard/ERC20Contract";
declare class MaidCafeContract extends ERC20Contract<MaidCafe> {
    constructor();
    enter(amount: BigNumberish): Promise<void>;
    leave(share: BigNumberish): Promise<void>;
    getEnterEvents(startBlock: number, endBlock: number): Promise<import("./maidcoin/typechain/commons").TypedEvent<[string, import("@ethersproject/bignumber").BigNumber] & {
        user: string;
        amount: import("@ethersproject/bignumber").BigNumber;
    }>[]>;
}
declare const _default: MaidCafeContract;
export default _default;
//# sourceMappingURL=MaidCafeContract.d.ts.map