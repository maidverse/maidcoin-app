"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
class FirstEarnPopup extends skynode_1.Popup {
    constructor(amount) {
        super(".popup-background");
        this.append(this.content = skynode_1.el(".first-earn-popup", skynode_1.el("h1", "I Earn $MAID !"), skynode_1.el(".amount", skynode_1.el("span", `+ ${CommonUtil_1.default.displayPrice(amount)}`), skynode_1.el("img.maidcoin", { src: "/images/component/first-earn-popup/maidcoin.png", height: "32" })), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/first-earn-popup/close-button.png", height: "20" }), {
            click: () => this.delete(),
        }), skynode_1.el("a.tweet-button", "Share", { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I earned ${CommonUtil_1.default.displayPrice(amount)} $MAID !\nhttps://app.maidcoin.org`)}`, target: "_blank" })));
    }
}
exports.default = FirstEarnPopup;
//# sourceMappingURL=FirstEarnPopup.js.map