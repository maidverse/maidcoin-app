import { BigNumber } from "@ethersproject/bignumber";
declare class StaticDataManager {
    getMaid(id: number): {
        originPower: number;
        name: string;
        character_voice: string;
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
    getNurseTypes(): number[];
    getNurseType(type: number): {
        name: string;
        partCount: number;
        destroyReturn: BigNumber;
        power: number;
        lifetime: number;
        width: number;
        left: number;
        top: number;
        averagePrice: number;
    };
    get raidCount(): number;
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