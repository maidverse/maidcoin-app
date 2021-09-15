import Config from "./Config";

class Calculator {

    public nurseLifetime(baseLifetime: number, assemblePartCount: number, partCount: number, assemble: boolean) {
        return baseLifetime * (partCount - (assemble === true ? 1 : 0)) / (assemblePartCount - 1);
    }

    public apr(investment: number, rewardPerBlock: number) {
        return rewardPerBlock * 365 * 24 * 60 * 60 / Config.blockTimeSecond / investment * 100;
    }
}

export default new Calculator();
