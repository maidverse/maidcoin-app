declare class Calculator {
    nurseLifetime(nurseType: number, partCount: number, assemble: boolean): number;
    poolAPR(poolId: number): Promise<0 | import("ethers").BigNumber>;
    nurseAPR(_nurseType: number): Promise<import("ethers").BigNumber>;
}
declare const _default: Calculator;
export default _default;
//# sourceMappingURL=Calculator.d.ts.map