import { BigNumberish } from "ethers";
import Config from "../../Config";
import Wallet from "../../ethereum/Wallet";
import TestLPTokenArtifact from "../artifacts/contracts/test/TestLPToken.sol/TestLPToken.json";
import ERC20Contract from "../standard/ERC20Contract";
import { TestLPToken } from "../typechain";

class TestLPTokenContract extends ERC20Contract<TestLPToken> {

    constructor() {
        super(Config.contracts.LPToken, TestLPTokenArtifact.abi, [
        ]);
    }

    public async mint(amount: BigNumberish) {
        const contract = await this.loadWalletContract();
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            await contract?.mint(owner, amount);
        }
    }
}

export default new TestLPTokenContract();
