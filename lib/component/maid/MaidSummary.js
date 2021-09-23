"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const LPTokenContract_1 = __importDefault(require("../../contracts/LPTokenContract"));
const MaidsContract_1 = __importDefault(require("../../contracts/MaidsContract"));
const NurseRaidContract_1 = __importDefault(require("../../contracts/NurseRaidContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const TokenPrompt_1 = __importDefault(require("../dialogue/TokenPrompt"));
const MaidDetail_1 = __importDefault(require("./MaidDetail"));
const Sound_1 = __importDefault(require("./Sound"));
class MaidSummary extends skynode_1.DomNode {
    constructor(maidId) {
        super(".maid-summary");
        this.maidId = maidId;
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"), this.footer = skynode_1.el("footer"));
        this.load();
        this.content.onDom("click", () => new MaidDetail_1.default(maidId));
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }
    async load() {
        const maid = StaticDataManager_1.default.getMaid(this.maidId);
        const supportedLP = await MaidsContract_1.default.getSupportedLP(this.maidId);
        const maidOwner = await MaidsContract_1.default.ownerOf(this.maidId);
        const maidPower = await NurseRaidContract_1.default.powerOfMaids(MaidsContract_1.default.address, this.maidId);
        const result = await superagent_1.default.get(`https://api.maidcoin.org/maids/${this.maidId}`);
        const tokenInfo = result.body;
        this.content.empty().append(skynode_1.el(".background", { style: { backgroundImage: `url(https://storage.googleapis.com/maidcoin/Maid/Ultimate/${tokenInfo.name}Ultimate.png)` } }), skynode_1.el(".image", { style: { backgroundImage: `url(https://storage.googleapis.com/maidcoin/Maid/Dialogue/${tokenInfo.name}Dialogue.png)` } }), skynode_1.el("header", skynode_1.el(".name", tokenInfo.name), skynode_1.el(".cv", `CV. ${tokenInfo.character_voice}`)), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(maidOwner)}`), skynode_1.el("a.speak-button", skynode_1.el("img", { src: "/images/component/maid-summary/speak-button.png", height: "28.5" }), {
            click: (event) => {
                event.stopPropagation();
                new Sound_1.default({
                    wav: `https://storage.googleapis.com/maidcoin/Maid/Voice/${tokenInfo.name}/${tokenInfo.name}LobbyTap${this.getRandomInt(1, 2)}.wav`,
                }).play();
            },
        }), skynode_1.el(".properties", skynode_1.el(".power", skynode_1.el("img", { src: "/images/component/power-icon.png", height: "23" }), skynode_1.el("span", String(maidPower))), skynode_1.el(".property.origin-power", "Origin Power: ", skynode_1.el("span", String(maid.originPower))), skynode_1.el(".property.additional-power", "Additional Power: ", skynode_1.el("span", String(maidPower - maid.originPower))), skynode_1.el(".property.lp-amount", "Supported LP Token Amount: ", skynode_1.el("span", ethers_1.utils.formatEther(supportedLP)))));
        this.footer.empty().append(skynode_1.el("a.power-up-button", "Power Up", {
            click: async (event) => {
                event.stopPropagation();
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const lpBalance = await LPTokenContract_1.default.balanceOf(owner);
                    new TokenPrompt_1.default("Support Maid", "How much amount to support?", "Support", 0, lpBalance, async (amount) => {
                        await MaidsContract_1.default.support(this.maidId, amount);
                    });
                }
            },
        }), skynode_1.el("a.power-down-button", "Power Down", {
            click: async (event) => {
                event.stopPropagation();
                const supported = await MaidsContract_1.default.getSupportedLP(this.maidId);
                new TokenPrompt_1.default("Desupport Maid", "How much amount to desupport?", "Desupport", 0, supported, async (amount) => {
                    await MaidsContract_1.default.desupport(this.maidId, amount);
                });
            },
        }));
    }
}
exports.default = MaidSummary;
//# sourceMappingURL=MaidSummary.js.map