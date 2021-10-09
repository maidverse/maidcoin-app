"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const Calculator_1 = __importDefault(require("../../Calculator"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Loading_1 = __importDefault(require("../Loading"));
class EarnFromFarmPopup extends skynode_1.Popup {
    constructor(tx, amount, apr) {
        super(".popup-background");
        this.tx = tx;
        this.amount = amount;
        this.apr = apr;
        this.append(this.content = skynode_1.el(".earn-from-farm-popup"));
        this.load();
    }
    async load() {
        const dollar = await Calculator_1.default.dollar(this.amount);
        this.content.append(skynode_1.el(".amount", `+ ${CommonUtil_1.default.displayPrice(this.amount)}`), skynode_1.el(".apr", "APR: ", skynode_1.el("span", `${CommonUtil_1.default.numberWithCommas(this.apr.toString())}%`)), skynode_1.el(".dollar", `+ ${CommonUtil_1.default.numberWithCommas(dollar.toString())}`), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/earn-from-farm-popup/close-button.png", height: "20" }), {
            click: () => this.delete(),
        }), skynode_1.el("a.tweet-button", "Share", {
            click: async () => {
                const loading = new Loading_1.default().appendTo(this);
                const result = await superagent_1.default.get(`https://api.maidcoin.org/generate-tweet-image?type=farm&tx=${this.tx}&amount=${CommonUtil_1.default.displayPrice(this.amount)}&dollar=${CommonUtil_1.default.numberWithCommas(dollar.toString())}&apr=${CommonUtil_1.default.numberWithCommas(this.apr.toString())}`);
                const url = result.text;
                open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I EARNED +${CommonUtil_1.default.displayPrice(this.amount)} $MAID ($${CommonUtil_1.default.numberWithCommas(dollar.toString())}) from @maid_coin ♥️\nCurrent APR is ${CommonUtil_1.default.numberWithCommas(String(this.apr))}%!!!\n\n#GameFi #PlayToEarn #DeFi #YieldFarming #NFT #IEarnMaid\n${url}`)}`);
                loading.delete();
            },
        }));
    }
}
exports.default = EarnFromFarmPopup;
//# sourceMappingURL=EarnFromFarmPopup.js.map