import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import Contract from "./Contract";
import LPTokenContract from "./LPTokenContract";
import TheMasterArtifact from "./maidcoin/artifacts/contracts/TheMaster.sol/TheMaster.json";
import { TheMaster } from "./maidcoin/typechain";

class TheMasterContract extends Contract<TheMaster> {

    constructor() {
        super(Config.contracts.TheMaster, TheMasterArtifact.abi, [
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

    public async getPoolAmount(pid: BigNumberish) {
        const [, , , , , , , amount] = await this.contract.poolInfo(pid);
        return amount;
    }

    public async getUserLPAmount(pid: BigNumberish, user: string) {
        const [amount] = await this.contract.userInfo(pid, BigNumber.from(user));
        return amount;
    }

    public async getSupportingAmount(user: string) {
        return this.getUserLPAmount(3, user);
    }

    public async getPendingReward(pid: BigNumberish, user: string) {
        return await this.contract.pendingReward(pid, user);
    }

    public async support(pid: BigNumberish, lpTokenAmount: BigNumberish, supportTo: BigNumberish) {

        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet.loadAddress();
        if (contract !== undefined && owner !== undefined) {

            if ((await LPTokenContract.allowance(owner, this.address)).lt(lpTokenAmount)) {

                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const signed = await Wallet.signERC20Permit(

                    await LPTokenContract.getName(),
                    "1",
                    LPTokenContract.address,

                    this.address,
                    lpTokenAmount,
                    await LPTokenContract.getNonce(owner),
                    deadline,
                );

                const estimation = await contract.estimateGas.supportWithPermit(pid, lpTokenAmount, supportTo, deadline, signed.v, signed.r, signed.s);
                await contract.supportWithPermit(pid, lpTokenAmount, supportTo, deadline, signed.v, signed.r, signed.s, { gasLimit: estimation.mul(12).div(10) });
            } else {
                const estimation = await contract.estimateGas.support(pid, lpTokenAmount, supportTo);
                await contract.support(pid, lpTokenAmount, supportTo, { gasLimit: estimation.mul(12).div(10) });
            }
        }
    }

    public async desupport(pid: BigNumberish, lpTokenAmount: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        if (contract !== undefined) {
            const estimation = await contract.estimateGas.desupport(pid, lpTokenAmount);
            await contract.desupport(pid, lpTokenAmount, { gasLimit: estimation.mul(12).div(10) });
        }
    }

    public async deposit(pid: BigNumberish, lpTokenAmount: BigNumberish) {

        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet.loadAddress();
        if (contract !== undefined && owner !== undefined) {

            if ((await LPTokenContract.allowance(owner, this.address)).lt(lpTokenAmount)) {

                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const signed = await Wallet.signERC20Permit(

                    await LPTokenContract.getName(),
                    "1",
                    LPTokenContract.address,

                    this.address,
                    lpTokenAmount,
                    await LPTokenContract.getNonce(owner),
                    deadline,
                );

                const estimation = await contract.estimateGas.depositWithPermit(pid, lpTokenAmount, owner, deadline, signed.v, signed.r, signed.s);
                await contract.depositWithPermit(pid, lpTokenAmount, owner, deadline, signed.v, signed.r, signed.s, { gasLimit: estimation.mul(12).div(10) });
            } else {
                const estimation = await contract.estimateGas.deposit(pid, lpTokenAmount, owner);
                await contract.deposit(pid, lpTokenAmount, owner, { gasLimit: estimation.mul(12).div(10) });
            }
        }
    }

    public async withdraw(pid: BigNumberish, lpTokenAmount: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            const estimation = await contract.estimateGas.withdraw(pid, lpTokenAmount, owner);
            await contract.withdraw(pid, lpTokenAmount, owner, { gasLimit: estimation.mul(12).div(10) });
        }
    }
}

export default new TheMasterContract();
