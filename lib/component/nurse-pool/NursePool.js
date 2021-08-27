"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
class NursePool extends skynode_1.DomNode {
    constructor(nurseType, nurseIds) {
        super(".nurse-pool");
        this.nurseType = nurseType;
        this.nurseIds = nurseIds;
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"));
        this.load();
    }
    async load() {
        const result = await superagent_1.default.post(`https://api.maidcoin.org/nursetypes/${this.nurseType}`);
        const tokenInfo = result.body;
        console.log(this.nurseIds);
        this.content.empty().append(skynode_1.el("header", skynode_1.el(".background"), skynode_1.el("h3", tokenInfo.name)));
    }
}
exports.default = NursePool;
//# sourceMappingURL=NursePool.js.map