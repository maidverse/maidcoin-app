"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const TheMaster_json_1 = __importDefault(require("./artifacts/contracts/TheMaster.sol/TheMaster.json"));
const Contract_1 = __importDefault(require("./Contract"));
const LPTokenContract_1 = __importDefault(require("./LPTokenContract"));
class TheMasterContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.TheMaster, TheMaster_json_1.default.abi, [
            "ChangeRewardCalculator",
            "Add",
            "Set",
            "Deposit",
            "Withdraw",
            "EmergencyWithdraw",
            "Support",
            "Desupport",
            "EmergencyDesupport",
            "SetIsSupporterPool",
        ]);
    }
    async getPoolCount() {
        return await this.contract.poolCount();
    }
    async getPool(poolId) {
        const [addr, delegate, supportable, supportingRatio, allocPoint, lastRewardBlock, accRewardPerShare, supply,] = await this.contract.poolInfo(poolId);
        return {
            addr,
            delegate,
            supportable,
            supportingRatio,
            allocPoint: allocPoint.toNumber(),
            lastRewardBlock: lastRewardBlock.toNumber(),
            accRewardPerShare,
            supply,
        };
    }
    async getSupportingAmount(user) {
        const [amount] = await this.contract.userInfo(3, ethers_1.BigNumber.from(user));
        return amount;
    }
    async getPendingReward(pid, user) {
        return await this.contract.pendingReward(pid, user);
    }
    async support(pid, lpTokenAmount, supportTo) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            if (await LPTokenContract_1.default.allowance(owner, this.address) < lpTokenAmount) {
                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const signed = await Wallet_1.default.signERC20Permit(await LPTokenContract_1.default.getName(), "1", LPTokenContract_1.default.address, this.address, lpTokenAmount, await LPTokenContract_1.default.getNonce(owner), deadline);
                await contract.supportWithPermit(pid, lpTokenAmount, supportTo, deadline, signed.v, signed.r, signed.s);
            }
            else {
                await contract.support(pid, lpTokenAmount, supportTo);
            }
        }
    }
    async desupport(pid, lpTokenAmount) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.desupport(pid, lpTokenAmount);
    }
    async deposit(pid, lpTokenAmount) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            if (await LPTokenContract_1.default.allowance(owner, this.address) < lpTokenAmount) {
                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const signed = await Wallet_1.default.signERC20Permit(await LPTokenContract_1.default.getName(), "1", LPTokenContract_1.default.address, this.address, lpTokenAmount, await LPTokenContract_1.default.getNonce(owner), deadline);
                await contract.depositWithPermit(pid, lpTokenAmount, owner, deadline, signed.v, signed.r, signed.s);
            }
            else {
                await contract.deposit(pid, lpTokenAmount, owner);
            }
        }
    }
    async withdraw(pid, lpTokenAmount) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            await contract.withdraw(pid, lpTokenAmount, owner);
        }
    }
}
exports.default = new TheMasterContract();
//# sourceMappingURL=TheMasterContract.js.map