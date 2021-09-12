"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const MaidsContract_1 = __importDefault(require("../../contracts/MaidsContract"));
const Sound_1 = __importDefault(require("./Sound"));
class MaidDetail extends skynode_1.Popup {
    constructor(maidId) {
        super(".maid-detail");
        this.maidId = maidId;
        this.scrollHandler = () => {
            const level = (this.domElement.scrollTop / (this.domElement.scrollHeight - this.rect.height)) / 2;
            this.image1?.style({ filter: `brightness(${1 - level})`, zIndex: level < 0.25 ? 1 : 0 });
            this.image2?.style({ filter: `brightness(${0.5 + level})`, zIndex: level < 0.25 ? 0 : 1 });
        };
        this.append(skynode_1.el("a.back-button", skynode_1.el("img", { src: "/images/component/maid-detail/back-button.png", height: "19.5" }), {
            click: () => this.delete(),
        }), this.content = skynode_1.el(".content"));
        this.load();
        this.onDom("scroll", this.scrollHandler);
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }
    async load() {
        const maid = await MaidsContract_1.default.getMaid(this.maidId);
        const maidOwner = await MaidsContract_1.default.ownerOf(this.maidId);
        const maidPower = await MaidsContract_1.default.powerOf(this.maidId);
        const result = await superagent_1.default.post(`https://api.maidcoin.org/maids/${this.maidId}`);
        const tokenInfo = result.body;
        this.content.empty().append(this.image1 = skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Maid/Dialogue/${tokenInfo.name}Dialogue.png` }), this.image2 = skynode_1.el("img.image2", { src: `https://storage.googleapis.com/maidcoin/Maid/Ultimate/${tokenInfo.name}Ultimate.png` }), skynode_1.el("header", skynode_1.el(".name", tokenInfo.name), skynode_1.el(".cv", `CV. ${tokenInfo.character_voice}`)), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(maidOwner)}`), skynode_1.el("a.speak-button", skynode_1.el("img", { src: "/images/component/maid-detail/speak-button.png", height: "28.5" }), {
            click: (event) => {
                event.stopPropagation();
                new Sound_1.default({
                    wav: `https://storage.googleapis.com/maidcoin/Maid/Voice/${tokenInfo.name}/${tokenInfo.name}LobbyTap${this.getRandomInt(1, 2)}.wav`,
                }).play();
            },
        }), skynode_1.el(".properties", skynode_1.el(".power", skynode_1.el("img", { src: "/images/component/power-icon.png", height: "23" }), skynode_1.el("span", String(maidPower))), skynode_1.el(".property.origin-power", "Origin Power: ", skynode_1.el("span", String(maid.originPower))), skynode_1.el(".property.additional-power", "Additional Power: ", skynode_1.el("span", String(maidPower - maid.originPower))), skynode_1.el(".property.lp-amount", "LP Supported: ", skynode_1.el("span", ethers_1.utils.formatEther(maid.supportedLPTokenAmount)))), skynode_1.el(".controller", skynode_1.el("a.power-up-button", "Power Up", {
            click: async (event) => {
                event.stopPropagation();
                const amount = prompt("How much amount to support?", "10");
                if (amount) {
                    await MaidsContract_1.default.support(this.maidId, ethers_1.utils.parseEther(amount));
                }
            },
        }), skynode_1.el("a.power-down-button", "Power Down", {
            click: async (event) => {
                event.stopPropagation();
            },
        })));
        this.scrollHandler();
    }
}
exports.default = MaidDetail;
//# sourceMappingURL=MaidDetail.js.map