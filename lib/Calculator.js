"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sushi_data_1 = __importDefault(require("@sushiswap/sushi-data"));
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const Config_1 = __importDefault(require("./Config"));
const MaidCafeContract_1 = __importDefault(require("./contracts/MaidCafeContract"));
const MaidCoinContract_1 = __importDefault(require("./contracts/MaidCoinContract"));
const TheMasterContract_1 = __importDefault(require("./contracts/TheMasterContract"));
const NetworkProvider_1 = __importDefault(require("./ethereum/NetworkProvider"));
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
        const totalStaked = await TheMasterContract_1.default.getPoolAmount(poolId);
        const totalRewardPricePerYear = ethers_1.utils.parseEther(result.token0.derivedETH.toFixed(18)).mul(Math.round(tokenPerBlock * blocksPerYear));
        const totalStakingTokenInPool = totalStaked.mul(ethers_1.utils.parseEther(String(result.reserveETH))).div(ethers_1.utils.parseEther(String(result.totalSupply)));
        return totalStakingTokenInPool.eq(0) === true ? ethers_1.BigNumber.from(0) : totalRewardPricePerYear.mul(100).div(totalStakingTokenInPool);
    }
    async dollar(amount) {
        const result = await superagent_1.default.get("https://api.coingecko.com/api/v3/coins/maidcoin");
        return amount.mul(Math.floor(result.body.market_data.current_price.usd * 10000)).div(ethers_1.utils.parseEther("10000"));
    }
    async cafeAPR24() {
        const currentBlock = await NetworkProvider_1.default.getBlockNumber();
        const events = await MaidCoinContract_1.default.getTransferEvents(MaidCafeContract_1.default.address, currentBlock - 5760, currentBlock);
        let total24 = ethers_1.BigNumber.from(0);
        for (const event of events) {
            total24 = total24.add(event.args[2]);
        }
        const maidcoinBalance = await MaidCoinContract_1.default.balanceOf(MaidCafeContract_1.default.address);
        return total24.mul(36500).div(maidcoinBalance);
    }
    async nurseAPR(_nurseType) {
        const nurseType = StaticDataManager_1.default.getNurseType(_nurseType);
        const blocksPerYear = 365 * 24 * 60 * 60 / Config_1.default.blockTimeSecond;
        const tokenPerBlock = Config_1.default.rewardPerBlock * pools_json_1.default[2].allocPoint / 100;
        const totalPower = await TheMasterContract_1.default.getPoolAmount(2);
        const totalRewardPerYear = ethers_1.utils.parseEther(String(tokenPerBlock * blocksPerYear));
        return totalRewardPerYear.mul(100).mul(nurseType.power).div(totalPower).div(ethers_1.utils.parseEther(String(nurseType.averagePrice)));
    }
    async nurseFullChargingAPR(_nurseType) {
        const nurseType = StaticDataManager_1.default.getNurseType(_nurseType);
        const blocksPerYear = 365 * 24 * 60 * 60 / Config_1.default.blockTimeSecond;
        const averagePrice = ethers_1.utils.parseEther(String(nurseType.averagePrice));
        const averagePartPrice = ethers_1.utils.parseEther(String(nurseType.averagePrice)).div(nurseType.partCount);
        const annualCost = averagePrice.add(averagePartPrice.mul(nurseType.partCount - 1).mul(ethers_1.utils.parseEther((blocksPerYear / nurseType.lifetime - 1).toFixed(18))).div(ethers_1.constants.WeiPerEther));
        const tokenPerBlock = Config_1.default.rewardPerBlock * pools_json_1.default[2].allocPoint / 100;
        const totalPower = await TheMasterContract_1.default.getPoolAmount(2);
        const totalRewardPerYear = ethers_1.utils.parseEther(String(tokenPerBlock * blocksPerYear));
        return totalRewardPerYear.mul(100).mul(nurseType.power).div(totalPower).div(annualCost);
    }
}
exports.default = new Calculator();
//# sourceMappingURL=Calculator.js.map