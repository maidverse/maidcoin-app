"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const NursePart_json_1 = __importDefault(require("./artifacts/contracts/NursePart.sol/NursePart.json"));
const ERC1155Contract_1 = __importDefault(require("./standard/ERC1155Contract"));
class NursePartContract extends ERC1155Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.NursePart, NursePart_json_1.default.abi, []);
    }
}
exports.default = new NursePartContract();
//# sourceMappingURL=NursePartContract.js.map