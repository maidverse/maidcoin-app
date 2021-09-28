"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sushi_data_1 = __importDefault(require("@sushiswap/sushi-data"));
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("./Config"));
const TheMasterContract_1 = __importDefault(require("./contracts/TheMasterContract"));
const pools_json_1 = __importDefault(require("./json/pools.json"));
const StaticDataManager_1 = __importDefault(require("./StaticDataManager"));
class Calculator {
    nurseLifetime(nurseType, partCount, assemble) {
        const nurseTypeInfo = StaticDataManager_1.default.getNurseType(nurseType);
        return nurseTypeInfo.lifetime * (partCount - (assemble === true ? 1 : 0)) / (nurseTypeInfo.partCount - 1);
    }
    async poolAPR(poolId) {
        const tokenPerBlock = Config_1.default.rewardPerBlock * pools_json_1.default[poolId].allocPoint / 100;
        const blocksPerYear = 365 * 24 * 60 * 60 / Config_1.default.blockTimeSecond;
        const result = await sushi_data_1.default.exchange.pair({ pair_address: "0xc7175038323562cb68e4bbdd379e9fe65134937f" });
        const totalStaked = await TheMasterContract_1.default.getPoolLPAmount(poolId);
        const totalRewardPricePerYear = ethers_1.utils.parseEther(String(result.token0.derivedETH)).mul(Math.round(tokenPerBlock * blocksPerYear));
        const totalStakingTokenInPool = totalStaked.mul(ethers_1.utils.parseEther(String(result.reserveETH))).div(ethers_1.utils.parseEther(String(result.totalSupply)));
        return totalStakingTokenInPool.eq(0) === true ? 0 : totalRewardPricePerYear.mul(100).div(totalStakingTokenInPool);
    }
    async nurseAPR(_nurseType) {
        const nurseType = StaticDataManager_1.default.getNurseType(_nurseType);
        const tokenPerBlock = Config_1.default.rewardPerBlock * pools_json_1.default[2].allocPoint / 100;
        const blocksPerYear = 365 * 24 * 60 * 60 / Config_1.default.blockTimeSecond;
        const totalPower = await TheMasterContract_1.default.getPoolLPAmount(2);
        const totalRewardPerYear = ethers_1.utils.parseEther(String(tokenPerBlock * blocksPerYear));
        return totalRewardPerYear.mul(100).mul(nurseType.power).div(totalPower).div(ethers_1.utils.parseEther(String(nurseType.averagePrice)));
    }
}
exports.default = new Calculator();
//# sourceMappingURL=Calculator.js.map