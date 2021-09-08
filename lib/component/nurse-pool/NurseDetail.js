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
const TheMasterContract_1 = __importDefault(require("../../contracts/TheMasterContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
class NurseDetail extends skynode_1.Popup {
    constructor(nurseId) {
        super(".nurse-detail");
        this.nurseId = nurseId;
        this.append(skynode_1.el("a.back-button", skynode_1.el("img", { src: "/images/component/nurse-detail/back-button.png", height: "19.5" }), {
            click: () => this.delete(),
        }), this.content = skynode_1.el(".content"));
        this.load();
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const nurse = await CloneNursesContract_1.default.getNurse(this.nurseId);
            const nurseOwner = await CloneNursesContract_1.default.ownerOf(this.nurseId);
            const nurseType = await CloneNursesContract_1.default.getNurseType(nurse.nurseType);
            const supportedPower = await CloneNursesContract_1.default.getSupportedPower(this.nurseId);
            const supportingTo = (await CloneNursesContract_1.default.getSupportingTo(owner)).toNumber();
            const supportingAmount = supportingTo !== this.nurseId ? ethers_1.BigNumber.from(0) : await TheMasterContract_1.default.getSupportingAmount(owner);
            const result = await superagent_1.default.post(`https://api.maidcoin.org/clonenurses/${this.nurseId}`);
            const tokenInfo = result.body;
            const pendingReward = await CloneNursesContract_1.default.getPendigReward(this.nurseId);
            this.content.empty().append(skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Illust/${tokenInfo.name}.png` }), skynode_1.el(".name", tokenInfo.name), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(nurseOwner)}`), skynode_1.el(".character", skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${tokenInfo.name}Idle.png`, height: "120" }), skynode_1.el("a.claim-button", skynode_1.el("img.coin-image", { src: "/images/maidcoin-claim.png" }), skynode_1.el(".amount", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(pendingReward))))), skynode_1.el(".properties", skynode_1.el(".power", skynode_1.el("img", { src: "/images/component/power-icon.png", height: "23" }), skynode_1.el("span", String(nurseType.power))), skynode_1.el(".property.lp-amount", "Total LP Supported: ", skynode_1.el("span", ethers_1.utils.formatEther(supportedPower))), skynode_1.el(".property.lp-amount", "LP Supported By Me: ", skynode_1.el("span", ethers_1.utils.formatEther(supportingAmount)))), skynode_1.el(".controller", skynode_1.el("a.power-up-button", "Power Up", {
                click: async (event) => {
                    event.stopPropagation();
                    const amount = prompt("How much amount to support?", "10");
                    if (amount) {
                        await TheMasterContract_1.default.support(3, ethers_1.utils.parseEther(amount), this.nurseId);
                    }
                },
            }), skynode_1.el("a.power-down-button", "Power Down", {
                click: async (event) => {
                    event.stopPropagation();
                },
            })));
        }
    }
}
exports.default = NurseDetail;
//# sourceMappingURL=NurseDetail.js.map