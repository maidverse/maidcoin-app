import { BigNumber, BigNumberish } from "ethers";
import Contract from "./Contract";
import { TheMaster } from "./maidcoin/typechain";
declare class TheMasterContract extends Contract<TheMaster> {
    constructor();
    getLPAmount(pid: BigNumberish, user: string): Promise<BigNumber>;
    getSupportingAmount(user: string): Promise<BigNumber>;
    getPendingReward(pid: BigNumberish, user: string): Promise<BigNumber>;
    support(pid: BigNumberish, lpTokenAmount: BigNumberish, supportTo: BigNumberish): Promise<void>;
    desupport(pid: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
    deposit(pid: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
    withdraw(pid: BigNumberish, lpTokenAmount: BigNumberish): Promise<void>;
}
declare const _default: TheMasterContract;
export default _default;
//# sourceMappingURL=TheMasterContract.d.ts.map