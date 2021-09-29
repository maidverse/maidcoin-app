import Config from "../Config";
import MaidCoinArtifact from "./maidcoin/artifacts/contracts/MaidCoin.sol/MaidCoin.json";
import ERC20Contract from "./standard/ERC20Contract";
import { MaidCoin } from "./maidcoin/typechain";

class MaidCoinContract extends ERC20Contract<MaidCoin> {

    constructor() {
        super(Config.contracts.MaidCoin, MaidCoinArtifact.abi, []);
    }

    public async getTransferEvents(to: string, startBlock: number, endBlock: number) {
        const filter = this.contract.filters.Transfer(null, to, null);
        return await this.contract.queryFilter(filter, startBlock, endBlock);
    }
}

export default new MaidCoinContract();
