import Config from "../Config";
import MaidCoinArtifact from "./artifacts/contracts/MaidCoin.sol/MaidCoin.json";
import ERC20Contract from "./standard/ERC20Contract";
import { MaidCoin } from "./typechain";

class MaidCoinContract extends ERC20Contract<MaidCoin> {

    constructor() {
        super(Config.contracts.MaidCoin, MaidCoinArtifact.abi, []);
    }
}

export default new MaidCoinContract();
