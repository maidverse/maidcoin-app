"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("./Config"));
const StaticDataManager_1 = __importDefault(require("./StaticDataManager"));
class Calculator {
    nurseLifetime(nurseType, partCount, assemble) {
        const nurseTypeInfo = StaticDataManager_1.default.getNurseType(nurseType);
        return nurseTypeInfo.lifetime * (partCount - (assemble === true ? 1 : 0)) / (nurseTypeInfo.partCount - 1);
    }
    apr(investment, rewardPerBlock) {
        return rewardPerBlock * 365 * 24 * 60 * 60 / Config_1.default.blockTimeSecond / investment * 100;
    }
}
exports.default = new Calculator();
//# sourceMappingURL=Calculator.js.map