"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const MaidsContract_1 = __importDefault(require("../../contracts/MaidsContract"));
const Loading_1 = __importDefault(require("../Loading"));
const MaidBook_1 = __importDefault(require("./MaidBook"));
class MaidList extends skynode_1.DomNode {
    constructor() {
        super(".maid-list");
        this.append(this.loading = new Loading_1.default(), this.maidContainer = skynode_1.el(".maid-container"));
        this.loadMaids();
    }
    async loadMaids() {
        const maidCount = (await MaidsContract_1.default.getTotalSupply()).toNumber();
        skyutil_1.default.repeat(maidCount, async (index) => {
            setTimeout(() => {
                if (this.deleted !== true) {
                    new MaidBook_1.default(maidCount - index - 1).appendTo(this.maidContainer);
                }
            }, index * 50);
        });
        this.loading.delete();
    }
}
exports.default = MaidList;
//# sourceMappingURL=MaidList.js.map