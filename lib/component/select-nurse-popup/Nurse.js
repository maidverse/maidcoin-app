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
const LPTokenContract_1 = __importDefault(require("../../contracts/LPTokenContract"));
const TheMasterContract_1 = __importDefault(require("../../contracts/TheMasterContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const TokenPrompt_1 = __importDefault(require("../dialogue/TokenPrompt"));
class Nurse extends skynode_1.DomNode {
    constructor(nurseId, owner) {
        super(".nurse");
        this.nurseId = nurseId;
        this.owner = owner;
        this.changeSupportedPowerHandler = async (id) => {
            if (id.eq(this.nurseId) === true) {
                const supportedPower = await CloneNursesContract_1.default.getSupportedPower(this.nurseId);
                this.supportedPower?.empty().appendText(ethers_1.utils.formatEther(supportedPower));
            }
        };
        this.transferHandler = async (from, to, id) => {
            if (to === ethers_1.constants.AddressZero && id.eq(this.nurseId) === true) {
                this.delete();
            }
        };
        this.load();
        CloneNursesContract_1.default.on("ChangeSupportedPower", this.changeSupportedPowerHandler);
        CloneNursesContract_1.default.on("Transfer", this.transferHandler);
    }
    async load() {
        const { nurseType } = await CloneNursesContract_1.default.getNurse(this.nurseId);
        const supportedPower = await CloneNursesContract_1.default.getSupportedPower(this.nurseId);
        const result = await superagent_1.default.get(`https://api.maidcoin.org/nursetypes/${nurseType}`);
        const tokenInfo = result.body;
        this.empty().append(skynode_1.el(".slot", skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${tokenInfo.name}.png` }), skynode_1.el(".name", tokenInfo.name)), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(this.owner)}`), skynode_1.el(".lp-amount", "Supported LP : ", this.supportedPower = skynode_1.el("span", ethers_1.utils.formatEther(supportedPower))), skynode_1.el("a.support-button", "Support", {
            click: async (event) => {
                event.stopPropagation();
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const balance = await LPTokenContract_1.default.balanceOf(owner);
                    new TokenPrompt_1.default("Support Nurse", "How much amount to support?", "Support", 0, balance, async (amount) => {
                        await TheMasterContract_1.default.support(3, amount, this.nurseId);
                    });
                }
            },
        }));
    }
    delete() {
        CloneNursesContract_1.default.off("ChangeSupportedPower", this.changeSupportedPowerHandler);
        CloneNursesContract_1.default.off("Transfer", this.transferHandler);
        super.delete();
    }
}
exports.default = Nurse;
//# sourceMappingURL=Nurse.js.map