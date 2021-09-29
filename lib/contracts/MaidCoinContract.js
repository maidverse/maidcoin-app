"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const MaidCoin_json_1 = __importDefault(require("./maidcoin/artifacts/contracts/MaidCoin.sol/MaidCoin.json"));
const ERC20Contract_1 = __importDefault(require("./standard/ERC20Contract"));
class MaidCoinContract extends ERC20Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.MaidCoin, MaidCoin_json_1.default.abi, []);
    }
    async getTransferEvents(to, startBlock, endBlock) {
        const filter = this.contract.filters.Transfer(null, to, null);
        return await this.contract.queryFilter(filter, startBlock, endBlock);
    }
}
exports.default = new MaidCoinContract();
//# sourceMappingURL=MaidCoinContract.js.map