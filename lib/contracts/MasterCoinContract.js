"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const MasterCoin_json_1 = __importDefault(require("./maidcoin/artifacts/contracts/MasterCoin.sol/MasterCoin.json"));
const ERC20Contract_1 = __importDefault(require("./standard/ERC20Contract"));
class MasterCoinContract extends ERC20Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.MasterCoin, MasterCoin_json_1.default.abi, []);
    }
}
exports.default = new MasterCoinContract();
//# sourceMappingURL=MasterCoinContract.js.map