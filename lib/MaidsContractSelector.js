"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LingerieGirlsContract_1 = __importDefault(require("./contracts/LingerieGirlsContract"));
const MaidsContract_1 = __importDefault(require("./contracts/MaidsContract"));
const SushiGirlsContract_1 = __importDefault(require("./contracts/SushiGirlsContract"));
class MaidsContractSelector {
    typeToAddress(type) {
        if (type === "Maid") {
            return MaidsContract_1.default.address;
        }
        else if (type === "LingerieGirl") {
            return LingerieGirlsContract_1.default.address;
        }
        else if (type === "SushiGirl") {
            return SushiGirlsContract_1.default.address;
        }
    }
    addressToContract(address) {
        if (address === MaidsContract_1.default.address) {
            return MaidsContract_1.default;
        }
        else if (address === LingerieGirlsContract_1.default.address) {
            return LingerieGirlsContract_1.default;
        }
        else if (address === SushiGirlsContract_1.default.address) {
            return SushiGirlsContract_1.default;
        }
    }
}
exports.default = new MaidsContractSelector();
//# sourceMappingURL=MaidsContractSelector.js.map