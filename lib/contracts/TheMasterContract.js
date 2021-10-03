"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const Contract_1 = __importDefault(require("./Contract"));
const LPTokenContract_1 = __importDefault(require("./LPTokenContract"));
const TheMaster_json_1 = __importDefault(require("./maidcoin/artifacts/contracts/TheMaster.sol/TheMaster.json"));
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
    async getPoolLPAmount(pid) {
        const [, , , , , , , amount] = await this.contract.poolInfo(pid);
        return amount;
    }
    async getUserLPAmount(pid, user) {
        const [amount] = await this.contract.userInfo(pid, ethers_1.BigNumber.from(user));
        return amount;
    }
    async getSupportingAmount(user) {
        return this.getUserLPAmount(3, user);
    }
    async getPendingReward(pid, user) {
        return await this.contract.pendingReward(pid, user);
    }
    async support(pid, lpTokenAmount, supportTo) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            if ((await LPTokenContract_1.default.allowance(owner, this.address)).lt(lpTokenAmount)) {
                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const signed = await Wallet_1.default.signERC20Permit(await LPTokenContract_1.default.getName(), "1", LPTokenContract_1.default.address, this.address, lpTokenAmount, await LPTokenContract_1.default.getNonce(owner), deadline);
                const estimation = await contract.estimateGas.supportWithPermit(pid, lpTokenAmount, supportTo, deadline, signed.v, signed.r, signed.s);
                await contract.supportWithPermit(pid, lpTokenAmount, supportTo, deadline, signed.v, signed.r, signed.s, { gasLimit: estimation.mul(12).div(10) });
            }
            else {
                const estimation = await contract.estimateGas.support(pid, lpTokenAmount, supportTo);
                await contract.support(pid, lpTokenAmount, supportTo, { gasLimit: estimation.mul(12).div(10) });
            }
        }
    }
    async desupport(pid, lpTokenAmount) {
        const contract = await this.connectAndGetWalletContract();
        if (contract !== undefined) {
            const estimation = await contract.estimateGas.desupport(pid, lpTokenAmount);
            await contract.desupport(pid, lpTokenAmount, { gasLimit: estimation.mul(12).div(10) });
        }
    }
    async deposit(pid, lpTokenAmount) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            if ((await LPTokenContract_1.default.allowance(owner, this.address)).lt(lpTokenAmount)) {
                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const signed = await Wallet_1.default.signERC20Permit(await LPTokenContract_1.default.getName(), "1", LPTokenContract_1.default.address, this.address, lpTokenAmount, await LPTokenContract_1.default.getNonce(owner), deadline);
                const estimation = await contract.estimateGas.depositWithPermit(pid, lpTokenAmount, owner, deadline, signed.v, signed.r, signed.s);
                await contract.depositWithPermit(pid, lpTokenAmount, owner, deadline, signed.v, signed.r, signed.s, { gasLimit: estimation.mul(12).div(10) });
            }
            else {
                const estimation = await contract.estimateGas.deposit(pid, lpTokenAmount, owner);
                await contract.deposit(pid, lpTokenAmount, owner, { gasLimit: estimation.mul(12).div(10) });
            }
        }
    }
    async withdraw(pid, lpTokenAmount) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            const estimation = await contract.estimateGas.withdraw(pid, lpTokenAmount, owner);
            await contract.withdraw(pid, lpTokenAmount, owner, { gasLimit: estimation.mul(12).div(10) });
        }
    }
}
exports.default = new TheMasterContract();
//# sourceMappingURL=TheMasterContract.js.map