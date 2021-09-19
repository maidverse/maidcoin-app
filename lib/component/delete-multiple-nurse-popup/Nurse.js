"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const MaidCoinContract_1 = __importDefault(require("../../contracts/MaidCoinContract"));
const TheMasterContract_1 = __importDefault(require("../../contracts/TheMasterContract"));
const TokenPrompt_1 = __importDefault(require("../dialogue/TokenPrompt"));
class Nurse extends skynode_1.DomNode {
    constructor(nurseId) {
        super(".nurse");
        this.nurseId = nurseId;
        this.load();
    }
    async load() {
        const { nurseType } = await CloneNursesContract_1.default.getNurse(this.nurseId);
        const owner = await CloneNursesContract_1.default.ownerOf(this.nurseId);
        const supportedPower = await CloneNursesContract_1.default.getSupportedPower(this.nurseId);
        const result = await superagent_1.default.get(`https://api.maidcoin.org/nursetypes/${nurseType}`);
        const tokenInfo = result.body;
        this.empty().append(skynode_1.el(".slot", skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${tokenInfo.name}.png` }), skynode_1.el(".name", tokenInfo.name)), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(owner)}`), skynode_1.el(".lp-amount", "Supported LP : ", skynode_1.el("span", ethers_1.utils.formatEther(supportedPower))), skynode_1.el("a.support-button", "Support", {
            click: async (event) => {
                event.stopPropagation();
                const balance = await MaidCoinContract_1.default.balanceOf(owner);
                new TokenPrompt_1.default("Support Nurse", "How much amount to support?", "Support", 0, balance, async (amount) => {
                    await TheMasterContract_1.default.support(3, amount, this.nurseId);
                });
            },
        }));
    }
}
exports.default = Nurse;
//# sourceMappingURL=Nurse.js.map