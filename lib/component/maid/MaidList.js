"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const Config_1 = __importDefault(require("../../Config"));
const MaidBook_1 = __importDefault(require("./MaidBook"));
class MaidList extends skynode_1.DomNode {
    constructor() {
        super(".maid-list");
        this.append(this.maidContainer = skynode_1.el(".maid-container"));
        this.loadMaids();
    }
    async loadMaids() {
        skyutil_1.default.repeat(Config_1.default.maidCount, async (index) => {
            setTimeout(() => {
                if (this.deleted !== true) {
                    new MaidBook_1.default(Config_1.default.maidCount - index - 1).appendTo(this.maidContainer);
                }
            }, index * 50);
        });
    }
}
exports.default = MaidList;
//# sourceMappingURL=MaidList.js.map