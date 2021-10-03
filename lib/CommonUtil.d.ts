import { BigNumberish } from "@ethersproject/bignumber";
declare class CommonUtil {
    shortenAddress(address: string): string;
    displayBlockDuration(blockCount: number): string;
    numberWithCommas(x: string, fractionDigits?: number): string;
    displayPrice(amount: BigNumberish): string;
}
declare const _default: CommonUtil;
export default _default;
//# sourceMappingURL=CommonUtil.d.ts.map