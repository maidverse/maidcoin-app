import { BigNumberish } from "ethers";
import Config from "../../Config";
import Wallet from "../../ethereum/Wallet";
import MaidCoinArtifact from "../maidcoin/artifacts/contracts/MaidCoin.sol/MaidCoin.json";
import { TestLPToken } from "../maidcoin/typechain";
import ERC20Contract from "../standard/ERC20Contract";

class TestMaidCoinContract extends ERC20Contract<TestLPToken> {

    constructor() {
        super(Config.contracts.MaidCoin, MaidCoinArtifact.abi, [
        ]);
    }

    public async mint(amount: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            await contract?.mint(owner, amount);
        }
    }
}

export default new TestMaidCoinContract();
