"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const MaidContract_1 = __importDefault(require("../../contracts/MaidContract"));
const Sound_1 = __importDefault(require("./Sound"));
class MaidSummary extends skynode_1.DomNode {
    constructor(maidId) {
        super(".maid-summary");
        this.maidId = maidId;
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"), this.footer = skynode_1.el("footer"));
        this.load();
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }
    async load() {
        const maid = await MaidContract_1.default.getMaid(this.maidId);
        const maidOwner = await MaidContract_1.default.ownerOf(this.maidId);
        const maidPower = await MaidContract_1.default.powerOf(this.maidId);
        const result = await superagent_1.default.post(`https://api.maidcoin.org/maid/${this.maidId}`);
        const tokenInfo = result.body;
        this.content.empty().append(skynode_1.el(".background", { style: { backgroundImage: `url(https://storage.googleapis.com/maidcoin/Illust/Ultimate/${tokenInfo.name}Ultimate.png)` } }), skynode_1.el(".image", { style: { backgroundImage: `url(${tokenInfo.image})` } }), skynode_1.el("header", skynode_1.el(".name", tokenInfo.name), skynode_1.el(".cv", `CV. ${tokenInfo.cv}`)), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(maidOwner)}`), skynode_1.el("a.speak-button", skynode_1.el("img", { src: "/images/component/maid-summary/speak-button.png", height: "28.5" }), {
            click: () => {
                new Sound_1.default({
                    wav: `https://storage.googleapis.com/maidcoin/Voice/${tokenInfo.name}/${tokenInfo.name}LobbyTap${this.getRandomInt(1, 2)}.wav`,
                }).play();
            },
        }), skynode_1.el(".properties", skynode_1.el(".property.power", "Power: ", skynode_1.el("span", String(maidPower))), skynode_1.el(".property.origin-power", "Origin Power: ", skynode_1.el("span", String(maid.originPower))), skynode_1.el(".property.additional-power", "Additional Power: ", skynode_1.el("span", String(maidPower - maid.originPower))), skynode_1.el(".property.lp-amount", "Supported LP Token Amount: ", skynode_1.el("span", ethers_1.utils.formatEther(maid.supportedLPTokenAmount)))));
        this.footer.empty().append(skynode_1.el("a.support-button", "Power Up", {
            click: async (event) => {
                event.stopPropagation();
                const amount = prompt("How much amount to support?", "10");
                if (amount) {
                    await MaidContract_1.default.support(this.maidId, ethers_1.utils.parseEther(amount));
                }
            },
        }));
    }
}
exports.default = MaidSummary;
//# sourceMappingURL=MaidSummary.js.map