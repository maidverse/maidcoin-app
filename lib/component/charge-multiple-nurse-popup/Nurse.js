"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const MaidCoinContract_1 = __importDefault(require("../../contracts/MaidCoinContract"));
const TheMasterContract_1 = __importDefault(require("../../contracts/TheMasterContract"));
const NetworkProvider_1 = __importDefault(require("../../ethereum/NetworkProvider"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const TokenPrompt_1 = __importDefault(require("../dialogue/TokenPrompt"));
class Nurse extends skynode_1.DomNode {
    constructor(nurseId) {
        super(".nurse");
        this.nurseId = nurseId;
        this.load();
    }
    async refreshLifetime() {
        if (this.endBlock !== undefined && this.currentBlockNumber !== undefined) {
            this.lifetime?.empty().appendText(CommonUtil_1.default.displayBlockDuration(this.endBlock - this.currentBlockNumber));
        }
    }
    async load() {
        this.currentBlockNumber = await NetworkProvider_1.default.getBlockNumber();
        const nurse = await CloneNursesContract_1.default.getNurse(this.nurseId);
        this.endBlock = nurse.endBlock;
        const owner = await CloneNursesContract_1.default.ownerOf(this.nurseId);
        const supportedPower = await CloneNursesContract_1.default.getSupportedPower(this.nurseId);
        const nurseType = StaticDataManager_1.default.getNurseType(nurse.nurseType);
        this.empty().append(skynode_1.el(".slot", skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${nurseType.name}.png` }), skynode_1.el(".name", nurseType.name)), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(owner)}`), skynode_1.el(".lp-amount", "Supported LP : ", skynode_1.el("span", ethers_1.utils.formatEther(supportedPower))), skynode_1.el("a.support-button", "Support", {
            click: async (event) => {
                event.stopPropagation();
                const balance = await MaidCoinContract_1.default.balanceOf(owner);
                new TokenPrompt_1.default("Support Nurse", "How much amount to support?", "Support", 0, balance, async (amount) => {
                    await TheMasterContract_1.default.support(3, amount, this.nurseId);
                });
            },
        }));
        this.refreshLifetime();
    }
}
exports.default = Nurse;
//# sourceMappingURL=Nurse.js.map