import { BigNumber } from "@ethersproject/bignumber";
declare class StaticDataManager {
    getMaid(id: number): {
        originPower: number;
        name: string;
    };
    getLingerieGirl(id: number): {
        originPower: number;
        name: string;
    };
    getSushiGirl(id: number): {
        originPower: number;
        name: string;
    };
    getNursePart(part: number): {
        name: string;
    };
    getNurseType(type: number): {
        partCount: number;
        destroyReturn: BigNumber;
        power: number;
        lifetime: number;
    };
    get raidCount(): any;
    getRaid(id: number): {
        entranceFee: BigNumber;
        nursePart: number;
        maxRewardCount: number;
        duration: number;
        endBlock: number;
    };
}
declare const _default: StaticDataManager;
export default _default;
//# sourceMappingURL=StaticDataManager.d.ts.map