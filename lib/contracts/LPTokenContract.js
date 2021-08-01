"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const UniswapV2ERC20_json_1 = __importDefault(require("./artifacts/contracts/uniswapv2/UniswapV2ERC20.sol/UniswapV2ERC20.json"));
const ERC20Contract_1 = __importDefault(require("./standard/ERC20Contract"));
class LPTokenContract extends ERC20Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.LPToken, UniswapV2ERC20_json_1.default.abi, []);
    }
}
exports.default = new LPTokenContract();
//# sourceMappingURL=LPTokenContract.js.map