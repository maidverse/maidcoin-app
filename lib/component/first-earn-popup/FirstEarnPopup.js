"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
class FirstEarnPopup extends skynode_1.Popup {
    constructor(amount) {
        super(".popup-background");
        this.append(this.content = skynode_1.el(".first-earn-popup", skynode_1.el("h1", "First Earn $MAID !"), skynode_1.el(".amount", skynode_1.el("span", `+ ${ethers_1.utils.formatEther(amount)}`), skynode_1.el("img.maidcoin", { src: "/images/component/first-earn-popup/maidcoin.png", height: "32" })), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/first-earn-popup/close-button.png", height: "20" }), {
            click: () => this.delete(),
        }), skynode_1.el("a.tweet-button", "Share", { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I earned ${ethers_1.utils.formatEther(amount)} $MAID !\nhttps://app.maidcoin.org`)}`, target: "_blank" })));
    }
}
exports.default = FirstEarnPopup;
//# sourceMappingURL=FirstEarnPopup.js.map