"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const SushiGirlsContract_1 = __importDefault(require("../../../contracts/SushiGirlsContract"));
const SushiGirl_1 = __importDefault(require("./SushiGirl"));
class SushiGirlList extends skynode_1.DomNode {
    constructor() {
        super(".sushigirl-list");
        this.loadSushiGirls();
    }
    async loadSushiGirls() {
        const sushiGirlCount = (await SushiGirlsContract_1.default.getTotalSupply()).toNumber();
        skyutil_1.default.repeat(sushiGirlCount, async (sushiGirlId) => {
            new SushiGirl_1.default(sushiGirlId).appendTo(this);
        });
    }
}
exports.default = SushiGirlList;
//# sourceMappingURL=SushiGirlList.js.map