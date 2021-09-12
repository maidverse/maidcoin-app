import Config from "../Config";
import UniswapV2ERC20Artifact from "./maidcoin/artifacts/contracts/uniswapv2/UniswapV2ERC20.sol/UniswapV2ERC20.json";
import ERC20Contract from "./standard/ERC20Contract";
import { UniswapV2ERC20 } from "./maidcoin/typechain";

class LPTokenContract extends ERC20Contract<UniswapV2ERC20> {

    constructor() {
        super(Config.contracts.LPToken, UniswapV2ERC20Artifact.abi, []);
    }
}

export default new LPTokenContract();
