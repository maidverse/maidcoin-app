import sushiData from "@sushiswap/sushi-data";
import { utils } from "ethers";
import Config from "./Config";
import TheMasterContract from "./contracts/TheMasterContract";
import pools from "./json/pools.json";
import StaticDataManager from "./StaticDataManager";

class Calculator {

    public nurseLifetime(nurseType: number, partCount: number, assemble: boolean) {
        const nurseTypeInfo = StaticDataManager.getNurseType(nurseType);
        return nurseTypeInfo.lifetime * (partCount - (assemble === true ? 1 : 0)) / (nurseTypeInfo.partCount - 1);
    }

    public async apr(poolId: number) {

        const tokenPerBlock = Config.rewardPerBlock * pools[poolId].allocPoint / 100;
        const blocksPerYear = 365 * 24 * 60 * 60 / Config.blockTimeSecond;

        const result = await sushiData.exchange.pair({ pair_address: "0xc7175038323562cb68e4bbdd379e9fe65134937f" });
        const totalStaked = await TheMasterContract.getPoolLPAmount(poolId);

        const totalRewardPricePerYear = utils.parseEther(String(result.token0.derivedETH)).mul(Math.round(tokenPerBlock * blocksPerYear));
        const totalStakingTokenInPool = totalStaked.mul(utils.parseEther(String(result.reserveETH))).div(utils.parseEther(String(result.totalSupply)));

        return totalStakingTokenInPool.eq(0) === true ? 0 : totalRewardPricePerYear.mul(100).div(totalStakingTokenInPool);
    }
}

export default new Calculator();
