import ERC20Contract from "./standard/ERC20Contract";
import { MaidCoin } from "./maidcoin/typechain";
declare class MaidCoinContract extends ERC20Contract<MaidCoin> {
    constructor();
    getTransferEvents(to: string, startBlock: number, endBlock: number): Promise<import("./maidcoin/typechain/commons").TypedEvent<[string, string, import("ethers").BigNumber] & {
        from: string;
        to: string;
        value: import("ethers").BigNumber;
    }>[]>;
}
declare const _default: MaidCoinContract;
export default _default;
//# sourceMappingURL=MaidCoinContract.d.ts.map