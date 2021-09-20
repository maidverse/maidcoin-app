"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../../Config"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const MaidCoin_json_1 = __importDefault(require("../maidcoin/artifacts/contracts/MaidCoin.sol/MaidCoin.json"));
const ERC20Contract_1 = __importDefault(require("../standard/ERC20Contract"));
class TestMaidCoinContract extends ERC20Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.MaidCoin, MaidCoin_json_1.default.abi, []);
    }
    async mint(amount) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            await contract?.mint(owner, amount);
        }
    }
}
exports.default = new TestMaidCoinContract();
//# sourceMappingURL=TestMaidCoinContract.js.map