"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const superagent_1 = __importDefault(require("superagent"));
const Nurse_1 = __importDefault(require("./Nurse"));
class NursePool extends skynode_1.DomNode {
    constructor(nurseType, nurseIds) {
        super(".nurse-pool");
        this.nurseType = nurseType;
        this.nurseIds = nurseIds;
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"));
        this.load();
    }
    async load() {
        const result = await superagent_1.default.get(`https://api.maidcoin.org/nursetypes/${this.nurseType}`);
        const tokenInfo = result.body;
        let nurseList;
        this.content.empty().append(skynode_1.el("header", skynode_1.el(".background"), skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${tokenInfo.name}.png` }), skynode_1.el("h3", tokenInfo.name)), nurseList = skynode_1.el(".nurse-list"));
        for (const nurseId of this.nurseIds) {
            const nurse = new Nurse_1.default(nurseId).appendTo(nurseList);
            nurse.style({
                width: this.content.rect.width / this.nurseIds.length,
                paddingBottom: skyutil_1.default.random(0, 10),
            });
        }
    }
}
exports.default = NursePool;
//# sourceMappingURL=NursePool.js.map