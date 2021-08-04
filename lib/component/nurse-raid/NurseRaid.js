"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
class NurseRaid extends skynode_1.DomNode {
    constructor(raid, currentBlockNumber) {
        super(".nurse-raid");
        this.raid = raid;
        this.currentBlockNumber = currentBlockNumber;
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"));
        this.load();
    }
    async load() {
        const result = await superagent_1.default.post(`https://api.maidcoin.org/nursetype/${this.raid.nursePart}`);
        const tokenInfo = result.body;
        this.content.empty().append(skynode_1.el(".name", tokenInfo.name), skynode_1.el(".image", {
            style: {
                backgroundImage: `url(${tokenInfo.image})`,
            },
        }), skynode_1.el(".end-time", `End ${CommonUtil_1.default.displayBlockDuration(this.raid.endBlock - this.currentBlockNumber)}`), skynode_1.el(".character", skynode_1.el("img", { src: "/images/test/NoelIdle.png", height: "85" })), skynode_1.el(".duration", skynode_1.el("span.title", "Duration"), skynode_1.el("span", CommonUtil_1.default.displayBlockDuration(this.raid.duration))), skynode_1.el(".progress"));
    }
}
exports.default = NurseRaid;
//# sourceMappingURL=NurseRaid.js.map