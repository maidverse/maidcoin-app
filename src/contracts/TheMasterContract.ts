import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import TheMasterArtifact from "./maidcoin/artifacts/contracts/TheMaster.sol/TheMaster.json";
import Contract from "./Contract";
import LPTokenContract from "./LPTokenContract";
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

    public async getLPAmount(pid: BigNumberish, user: string) {
        const [amount] = await this.contract.userInfo(pid, BigNumber.from(user));
        return amount;
    }

    public async getSupportingAmount(user: string) {
        return this.getLPAmount(3, user);
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

                await contract.supportWithPermit(pid, lpTokenAmount, supportTo, deadline, signed.v, signed.r, signed.s);
            } else {
                await contract.support(pid, lpTokenAmount, supportTo);
            }
        }
    }

    public async desupport(pid: BigNumberish, lpTokenAmount: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.desupport(pid, lpTokenAmount);
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

                await contract.depositWithPermit(pid, lpTokenAmount, owner, deadline, signed.v, signed.r, signed.s);
            } else {
                await contract.deposit(pid, lpTokenAmount, owner);
            }
        }
    }

    public async withdraw(pid: BigNumberish, lpTokenAmount: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            await contract.withdraw(pid, lpTokenAmount, owner);
        }
    }
}

export default new TheMasterContract();
