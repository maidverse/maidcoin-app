import Config from "./Config";
import StaticDataManager from "./StaticDataManager";

class Calculator {

    public nurseLifetime(nurseType: number, partCount: number, assemble: boolean) {
        const nurseTypeInfo = StaticDataManager.getNurseType(nurseType);
        return nurseTypeInfo.lifetime * (partCount - (assemble === true ? 1 : 0)) / (nurseTypeInfo.partCount - 1);
    }

    public apr(investment: number, rewardPerBlock: number) {
        return rewardPerBlock * 365 * 24 * 60 * 60 / Config.blockTimeSecond / investment * 100;
    }
}

export default new Calculator();
