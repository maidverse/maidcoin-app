import { BigNumberish } from "@ethersproject/bignumber";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import MaidCafeArtifact from "./maidcoin/artifacts/contracts/MaidCafe.sol/MaidCafe.json";
import { MaidCafe } from "./maidcoin/typechain";
import MaidCoinContract from "./MaidCoinContract";
import ERC20Contract from "./standard/ERC20Contract";

class MaidCafeContract extends ERC20Contract<MaidCafe> {

    constructor() {
        super(Config.contracts.MaidCafe, MaidCafeArtifact.abi, [
            "Enter",
            "Leave",
        ]);
    }

    public async enter(amount: BigNumberish) {

        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet.loadAddress();
        if (contract !== undefined && owner !== undefined) {

            if ((await MaidCoinContract.allowance(owner, this.address)).lt(amount)) {

                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const signed = await Wallet.signERC20Permit(

                    await MaidCoinContract.getName(),
                    "1",
                    MaidCoinContract.address,

                    this.address,
                    amount,
                    await MaidCoinContract.getNonce(owner),
                    deadline,
                );

                await contract.enterWithPermit(amount, deadline, signed.v, signed.r, signed.s);
            } else {
                await contract.enter(amount);
            }
        }
    }

    public async leave(share: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.leave(share);
    }
}

export default new MaidCafeContract();
