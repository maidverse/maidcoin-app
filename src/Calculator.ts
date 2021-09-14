import Config from "./Config";

class Calculator {

    public nurseLifetime(baseLifetime: number, assemblePartCount: number, partCount: number) {
        return baseLifetime * (partCount - 1) / (assemblePartCount - 1);
    }

    public apr(investment: number, rewardPerBlock: number) {
        return rewardPerBlock * 365 * 24 * 60 * 60 / Config.blockTimeSecond / investment * 100;
    }
}

export default new Calculator();
