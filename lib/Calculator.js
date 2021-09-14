"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("./Config"));
class Calculator {
    nurseLifetime(baseLifetime, assemblePartCount, partCount) {
        return baseLifetime * (partCount - 1) / (assemblePartCount - 1);
    }
    apr(investment, rewardPerBlock) {
        return rewardPerBlock * 365 * 24 * 60 * 60 / Config_1.default.blockTimeSecond / investment * 100;
    }
}
exports.default = new Calculator();
//# sourceMappingURL=Calculator.js.map