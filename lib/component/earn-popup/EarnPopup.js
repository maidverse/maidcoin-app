"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
class EarnPopup extends skynode_1.Popup {
    constructor(amount, apr) {
        super(".popup-background");
        this.append(this.content = skynode_1.el(".earn-popup", skynode_1.el(".amount", `+ ${CommonUtil_1.default.displayPrice(amount)}`), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/first-earn-popup/close-button.png", height: "20" }), {
            click: () => this.delete(),
        }), skynode_1.el("a.tweet-button", "Share", { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I EARNED ${CommonUtil_1.default.displayPrice(amount)} $MAID from @maid_coin ♥️\n\n#GameFi #PlayToEarn #DeFi #YieldFarming #NFT #IEarnMaidCoin`)}`, target: "_blank" })));
    }
}
exports.default = EarnPopup;
//# sourceMappingURL=EarnPopup.js.map