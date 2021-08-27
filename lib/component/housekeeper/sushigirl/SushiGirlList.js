"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const SushiGirlsContract_1 = __importDefault(require("../../../contracts/SushiGirlsContract"));
const Wallet_1 = __importDefault(require("../../../ethereum/Wallet"));
class SushiGirlList extends skynode_1.DomNode {
    constructor() {
        super(".sushi-girl-list");
        this.loadSushiGirls();
    }
    async loadSushiGirls() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const sushiGirlCount = (await SushiGirlsContract_1.default.balanceOf(owner)).toNumber();
            console.log(sushiGirlCount);
        }
    }
}
exports.default = SushiGirlList;
//# sourceMappingURL=SushiGirlList.js.map