import sushiData from "@sushiswap/sushi-data";
import { BigNumber, constants, utils } from "ethers";
import superagent from "superagent";
import Config from "./Config";
import CloneNursesContract from "./contracts/CloneNursesContract";
import MaidCafeContract from "./contracts/MaidCafeContract";
import MaidCoinContract from "./contracts/MaidCoinContract";
import NurseRaidContract from "./contracts/NurseRaidContract";
import TheMasterContract from "./contracts/TheMasterContract";
import NetworkProvider from "./ethereum/NetworkProvider";
import pools from "./json/pools.json";
import StaticDataManager from "./StaticDataManager";

class Calculator {

    public nurseLifetime(nurseType: number, partCount: number, assemble: boolean) {
        const nurseTypeInfo = StaticDataManager.getNurseType(nurseType);
        return nurseTypeInfo.lifetime * (partCount - (assemble === true ? 1 : 0)) / (nurseTypeInfo.partCount - 1);
    }

    public async poolAPR(poolId: number) {

        const tokenPerBlock = Config.rewardPerBlock * pools[poolId].allocPoint / 100;
        const blocksPerYear = 365 * 24 * 60 * 60 / Config.blockTimeSecond;

        const result = await sushiData.exchange.pair({ pair_address: "0xc7175038323562cb68e4bbdd379e9fe65134937f" });
        const totalStaked = await TheMasterContract.getPoolAmount(poolId);

        const totalRewardPricePerYear = utils.parseEther(result.token0.derivedETH.toFixed(18)).mul(Math.round(tokenPerBlock * blocksPerYear));
        const totalStakingTokenInPool = totalStaked.mul(utils.parseEther(String(result.reserveETH))).div(utils.parseEther(String(result.totalSupply)));

        return totalStakingTokenInPool.eq(0) === true ? BigNumber.from(0) : totalRewardPricePerYear.mul(100).div(totalStakingTokenInPool);
    }

    public async dollar(amount: BigNumber) {
        const result = await superagent.get("https://api.coingecko.com/api/v3/coins/maidcoin");
        return amount.mul(Math.floor(result.body.market_data.current_price.usd * 10000)).div(utils.parseEther("10000"));
    }

    public async cafeAPR24() {
        const currentBlock = await NetworkProvider.getBlockNumber();
        const events = await MaidCoinContract.getTransferEvents(MaidCafeContract.address, currentBlock - 5760, currentBlock);
        let total24 = BigNumber.from(0);
        for (const event of events) {
            total24 = total24.add(event.args[2]);
        }
        const enterEvents = await MaidCafeContract.getEnterEvents(currentBlock - 5760, currentBlock);
        for (const event of enterEvents) {
            total24 = total24.sub(event.args[1]);
        }
        const maidcoinBalance = await MaidCoinContract.balanceOf(MaidCafeContract.address);
        return total24.mul(36500).div(maidcoinBalance);
    }

    public async nurseAPR(_nurseType: number) {

        const nurseType = StaticDataManager.getNurseType(_nurseType);

        const blocksPerYear = 365 * 24 * 60 * 60 / Config.blockTimeSecond;

        const averagePrice = utils.parseEther(String(nurseType.averagePrice));
        const averagePartPrice = utils.parseEther(String(nurseType.averagePrice)).div(nurseType.partCount);

        const annualCost = averagePrice.add(averagePartPrice.mul(nurseType.partCount - 1).mul(utils.parseEther((blocksPerYear / nurseType.lifetime - 1).toFixed(18))).div(constants.WeiPerEther));

        const tokenPerBlock = Config.rewardPerBlock * pools[2].allocPoint / 100;

        const totalPower = await TheMasterContract.getPoolAmount(2);
        const totalRewardPerYear = utils.parseEther(String(tokenPerBlock * blocksPerYear));

        return totalRewardPerYear.mul(100).mul(nurseType.power).div(totalPower).div(annualCost);
    }
}

export default new Calculator();
