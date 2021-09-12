import Config from "../Config";
import MasterCoinArtifact from "./maidcoin/artifacts/contracts/MasterCoin.sol/MasterCoin.json";
import ERC20Contract from "./standard/ERC20Contract";
import { MasterCoin } from "./maidcoin/typechain";

class MasterCoinContract extends ERC20Contract<MasterCoin> {

    constructor() {
        super(Config.contracts.MasterCoin, MasterCoinArtifact.abi, []);
    }
}

export default new MasterCoinContract();
