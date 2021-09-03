"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
class NursePart extends skynode_1.DomNode {
    constructor(nurseType, nursePartCount) {
        super(".nurse-part");
        this.nurseType = nurseType;
        this.nursePartCount = nursePartCount;
        this.load();
    }
    async load() {
        const result = await superagent_1.default.post(`https://api.maidcoin.org/nurseparts/${this.nurseType}`);
        const tokenInfo = result.body;
        this.append(skynode_1.el("img.part", { src: tokenInfo.image, height: "60" }), skynode_1.el("span.count", String(this.nursePartCount)));
    }
}
exports.default = NursePart;
//# sourceMappingURL=NursePart.js.map