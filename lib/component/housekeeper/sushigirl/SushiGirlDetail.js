"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../../CommonUtil"));
const SushiGirlsContract_1 = __importDefault(require("../../../contracts/SushiGirlsContract"));
class SushiGirlDetail extends skynode_1.Popup {
    constructor(id) {
        super(".sushigirl-detail");
        this.id = id;
        this.append(skynode_1.el("a.back-button", skynode_1.el("img", { src: "/images/component/housekeeper-detail/back-button.png", height: "19.5" }), {
            click: () => this.delete(),
        }), this.content = skynode_1.el(".content"));
        this.load();
    }
    async load() {
        const sushiGirl = await SushiGirlsContract_1.default.getSushiGirl(this.id);
        const sushiGirlOwner = await SushiGirlsContract_1.default.ownerOf(this.id);
        const sushiGirlPower = await SushiGirlsContract_1.default.powerOf(this.id);
        const result = await superagent_1.default.post(`https://api.maidcoin.org/sushigirls/${this.id}`);
        const tokenInfo = result.body;
        this.content.empty().append(skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/SushiGirl/Character/${this.id}.png` }), skynode_1.el(".name", tokenInfo.name), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(sushiGirlOwner)}`), skynode_1.el(".properties", skynode_1.el(".power", skynode_1.el("img", { src: "/images/component/power-icon.png", height: "23" }), skynode_1.el("span", String(sushiGirlPower))), skynode_1.el(".property.origin-power", "Origin Power: ", skynode_1.el("span", String(sushiGirl.originPower))), skynode_1.el(".property.additional-power", "Additional Power: ", skynode_1.el("span", String(sushiGirlPower - sushiGirl.originPower))), skynode_1.el(".property.lp-amount", "LP Supported: ", skynode_1.el("span", ethers_1.utils.formatEther(sushiGirl.supportedLPTokenAmount)))), skynode_1.el(".controller", skynode_1.el("a.power-up-button", "Power Up", {
            click: async (event) => {
                event.stopPropagation();
                const amount = prompt("How much amount to support?", "10");
                if (amount) {
                    await SushiGirlsContract_1.default.support(this.id, ethers_1.utils.parseEther(amount));
                }
            },
        }), skynode_1.el("a.power-down-button", "Power Down", {
            click: async (event) => {
                event.stopPropagation();
            },
        })));
    }
}
exports.default = SushiGirlDetail;
//# sourceMappingURL=SushiGirlDetail.js.map