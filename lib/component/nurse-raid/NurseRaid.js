"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const NurseRaidContract_1 = __importDefault(require("../../contracts/NurseRaidContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const SelectMaidPopup_1 = __importDefault(require("../select-maid-popup/SelectMaidPopup"));
class NurseRaid extends skynode_1.DomNode {
    constructor(raidId, raid, currentBlockNumber) {
        super(".nurse-raid");
        this.raidId = raidId;
        this.raid = raid;
        this.currentBlockNumber = currentBlockNumber;
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"), this.footer = skynode_1.el("footer"));
        this.load();
    }
    async load() {
        const result = await superagent_1.default.get(`https://api.maidcoin.org/nursetypes/${this.raid.nursePart}`);
        const tokenInfo = result.body;
        this.content.empty().append(skynode_1.el(".name", tokenInfo.name), skynode_1.el(".image", { style: { backgroundImage: `url(https://storage.googleapis.com/maidcoin/Nurse/Illust/${tokenInfo.name}.png)` } }), skynode_1.el(".end-time", `End ${CommonUtil_1.default.displayBlockDuration(this.raid.endBlock - this.currentBlockNumber)}`), skynode_1.el(".character", skynode_1.el("img", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${tokenInfo.name}Idle.png`, height: "85" })), skynode_1.el(".duration", skynode_1.el("span.title", "Duration"), skynode_1.el("span", CommonUtil_1.default.displayBlockDuration(this.raid.duration))), skynode_1.el(".progress"));
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const challenger = await NurseRaidContract_1.default.getChallenger(this.raidId, owner);
            this.footer.empty().append(skynode_1.el(".reward", skynode_1.el("h3", "Rewards"), skynode_1.el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${tokenInfo.name}.png`, height: "28" }), skynode_1.el(".count", `x 1 ~ ${this.raid.maxRewardCount}`)), challenger.enterBlock === 0 ? skynode_1.el("a.start-button", ethers_1.utils.formatEther(this.raid.entranceFee), skynode_1.el("img.icon", { src: "/images/maidcoin.png", height: "20.5" }), "Start", {
                click: () => new SelectMaidPopup_1.default(this.raidId, this.raid),
            }) : skynode_1.el("a.cancel-button", await NurseRaidContract_1.default.checkDone(this.raidId) === true ? "Exit" : "Cancel", {
                click: async () => {
                    await NurseRaidContract_1.default.exit([this.raidId]);
                },
            }));
        }
    }
}
exports.default = NurseRaid;
//# sourceMappingURL=NurseRaid.js.map