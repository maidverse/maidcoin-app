import { BigNumber } from "ethers";
declare class Calculator {
    nurseLifetime(nurseType: number, partCount: number, assemble: boolean): number;
    poolAPR(poolId: number): Promise<number>;
    dollar(amount: BigNumber): Promise<BigNumber>;
    cafeAPR24(): Promise<number>;
    nurseAPR(_nurseType: number): Promise<number>;
}
declare const _default: Calculator;
export default _default;
//# sourceMappingURL=Calculator.d.ts.map