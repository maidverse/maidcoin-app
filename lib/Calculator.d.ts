import { BigNumber } from "ethers";
declare class Calculator {
    nurseLifetime(nurseType: number, partCount: number, assemble: boolean): number;
    poolAPR(poolId: number): Promise<BigNumber | 0>;
    cafeAPR24(): Promise<BigNumber>;
    nurseAPR(_nurseType: number): Promise<BigNumber>;
}
declare const _default: Calculator;
export default _default;
//# sourceMappingURL=Calculator.d.ts.map