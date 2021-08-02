"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const Config_1 = __importDefault(require("../../Config"));
class MoreMenu extends skynode_1.ClosableFloatingDomNode {
    constructor(position) {
        super(position, ".more-menu");
        this.append(Config_1.default.chainId !== 1 ? skynode_1.el("a", "Test LP Token", { click: () => skyrouter_1.SkyRouter.go("/test-lp-token") }) : undefined, skynode_1.el("a", "Docs", { href: "https://medium.com/maid-coin", target: "_blank" }), skynode_1.el("a", "Open Source", { href: "https://github.com/maidcoingit", target: "_blank" }), skynode_1.el("a", "Discord", { href: "https://discord.gg/ZMWNjs6F3V", target: "_blank" }), skynode_1.el("a", "Telegram", { href: "https://t.me/maidcoingroup", target: "_blank" }), skynode_1.el("a", "Twitter", { href: "https://twitter.com/maid_coin", target: "_blank" }));
    }
}
exports.default = MoreMenu;
//# sourceMappingURL=MoreMenu.js.map