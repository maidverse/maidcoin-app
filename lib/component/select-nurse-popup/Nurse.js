"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
class Nurse extends skynode_1.DomNode {
    constructor(nurseId) {
        super(".nurse");
        this.nurseId = nurseId;
        this.load();
    }
    async load() {
        const { nurseType } = await CloneNursesContract_1.default.getNurse(this.nurseId);
        const result = await superagent_1.default.get(`https://api.maidcoin.org/nursetypes/${nurseType}`);
        const tokenInfo = result.body;
        this.empty().append(skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/CloneNurse/Face/${nurseType}.png` }), skynode_1.el(".name", tokenInfo.name));
    }
}
exports.default = Nurse;
//# sourceMappingURL=Nurse.js.map