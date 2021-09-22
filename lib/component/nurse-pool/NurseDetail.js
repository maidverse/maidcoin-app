"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const Calculator_1 = __importDefault(require("../../Calculator"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const LPTokenContract_1 = __importDefault(require("../../contracts/LPTokenContract"));
const TheMasterContract_1 = __importDefault(require("../../contracts/TheMasterContract"));
const NetworkProvider_1 = __importDefault(require("../../ethereum/NetworkProvider"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const TokenPrompt_1 = __importDefault(require("../dialogue/TokenPrompt"));
const RouteNursePopup_1 = __importDefault(require("../route-nurse-popup/RouteNursePopup"));
const ChargeNursePopup_1 = __importDefault(require("./ChargeNursePopup"));
class NurseDetail extends skynode_1.Popup {
    constructor(nurseId) {
        super(".nurse-detail");
        this.nurseId = nurseId;
        this.elongateLifetimeHandler = (id, rechargedLifetime, lastEndBlock, newEndBlock) => {
            this.endBlock = newEndBlock.toNumber();
            this.refreshLifetime();
        };
        this.append(skynode_1.el("a.back-button", skynode_1.el("img", { src: "/images/component/nurse-detail/back-button.png", height: "19.5" }), {
            click: () => this.delete(),
        }), this.content = skynode_1.el(".content"));
        this.load();
        CloneNursesContract_1.default.on("ElongateLifetime", this.elongateLifetimeHandler);
    }
    async refreshLifetime() {
        if (this.endBlock !== undefined && this.currentBlockNumber !== undefined) {
            this.lifetime?.empty().appendText(CommonUtil_1.default.displayBlockDuration(this.endBlock - this.currentBlockNumber));
        }
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            this.currentBlockNumber = await NetworkProvider_1.default.getBlockNumber();
            const nurse = await CloneNursesContract_1.default.getNurse(this.nurseId);
            this.endBlock = nurse.endBlock;
            const nurseOwner = await CloneNursesContract_1.default.ownerOf(this.nurseId);
            const nurseType = StaticDataManager_1.default.getNurseType(nurse.nurseType);
            const supportedPower = await CloneNursesContract_1.default.getSupportedPower(this.nurseId);
            const { supportingTo } = await CloneNursesContract_1.default.findSupportingTo(owner);
            const supportingAmount = supportingTo !== this.nurseId ? ethers_1.BigNumber.from(0) : await TheMasterContract_1.default.getSupportingAmount(owner);
            const result = await superagent_1.default.get(`https://api.maidcoin.org/nursetypes/${nurse.nurseType}`);
            const tokenInfo = result.body;
            const pendingReward = await CloneNursesContract_1.default.getPendigReward(this.nurseId);
            let lifetimePercent = (this.endBlock - this.currentBlockNumber) /
                Calculator_1.default.nurseLifetime(nurse.nurseType, nurseType.partCount, true) * 100;
            if (lifetimePercent < 0) {
                lifetimePercent = 0;
            }
            if (lifetimePercent > 100) {
                lifetimePercent = 100;
            }
            this.content.empty().append(owner !== nurseOwner ? undefined : skynode_1.el("a.delete-button", skynode_1.el("img.image", { src: "/images/component/nurse-detail/delete-button.png", height: "33.5" }), {
                click: () => new RouteNursePopup_1.default(supportedPower, async (toNurseId) => {
                    await CloneNursesContract_1.default.destroy([this.nurseId], [toNurseId]);
                    this.delete();
                }),
            }), skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Illust/${tokenInfo.name}.png` }), skynode_1.el(".name", tokenInfo.name), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(nurseOwner)}`), skynode_1.el(".character", skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${tokenInfo.name}Idle.png`, height: "120" }), owner !== nurseOwner ? undefined : skynode_1.el("a.claim-button", skynode_1.el("img.coin-image", { src: "/images/component/nurse-detail/maidcoin.png", height: "29" }), skynode_1.el(".amount", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(pendingReward))), { click: async () => await CloneNursesContract_1.default.claim([this.nurseId]) })), skynode_1.el(".battery", skynode_1.el("span", "Battery"), skynode_1.el(".range-container", skynode_1.el(".range", skynode_1.el(".bar", {
                style: { width: `${lifetimePercent < 0 ? 0 : lifetimePercent}%` },
            })), this.lifetime = skynode_1.el(".lifetime")), owner !== nurseOwner ? undefined : skynode_1.el("a.charge-button", skynode_1.el("img.image", { src: "/images/component/nurse-detail/charge-button.png", height: "29" }), { click: () => new ChargeNursePopup_1.default(this.nurseId) })), skynode_1.el(".properties", skynode_1.el(".power", skynode_1.el("img", { src: "/images/component/power-icon.png", height: "23" }), skynode_1.el("span", String(nurseType.power))), skynode_1.el(".property.lp-amount", "Total LP Supported: ", skynode_1.el("span", ethers_1.utils.formatEther(supportedPower))), skynode_1.el(".property.lp-amount", "LP Supported By Me: ", skynode_1.el("span", ethers_1.utils.formatEther(supportingAmount)))), skynode_1.el(".controller", skynode_1.el("a.support-button", "Support", {
                click: async (event) => {
                    event.stopPropagation();
                    const lpBalance = await LPTokenContract_1.default.balanceOf(owner);
                    new TokenPrompt_1.default("Support Nurse", "How much amount to support?", "Support", 0, lpBalance, async (amount) => {
                        await TheMasterContract_1.default.support(3, amount, supportingTo);
                    });
                },
            }), skynode_1.el("a.desupport-button", "Desupport", {
                click: async (event) => {
                    event.stopPropagation();
                    const lpBalance = await LPTokenContract_1.default.balanceOf(owner);
                    new TokenPrompt_1.default("Desupport Nurse", "How much amount to desupport?", "Desupport", 0, lpBalance, async (amount) => {
                        await TheMasterContract_1.default.desupport(3, amount);
                    });
                },
            })));
        }
        this.refreshLifetime();
    }
    delete() {
        CloneNursesContract_1.default.off("ElongateLifetime", this.elongateLifetimeHandler);
        super.delete();
    }
}
exports.default = NurseDetail;
//# sourceMappingURL=NurseDetail.js.map