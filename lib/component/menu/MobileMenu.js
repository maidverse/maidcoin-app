"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const Config_1 = __importDefault(require("../../Config"));
class MobileMenu extends skynode_1.ClosableFloatingDomNode {
    constructor(position) {
        super(position, ".mobile-menu");
        this.append(skynode_1.el("img.menu-icon", { src: "/images/view/layout/menu-button.png", height: "16" }, {
            click: () => this.delete(),
        }), skynode_1.el(".top-menu", skynode_1.el("a", "Dashboard", { click: () => skyrouter_1.SkyRouter.go("/") }), skynode_1.el("a", "Maid", { click: () => skyrouter_1.SkyRouter.go("/maid") }), skynode_1.el("a", "Nurse Raid", { click: () => skyrouter_1.SkyRouter.go("/nurseraid") }), skynode_1.el("a", "Nurse Factory", { click: () => skyrouter_1.SkyRouter.go("/nursefactory") }), skynode_1.el("a", "Earn", { click: () => skyrouter_1.SkyRouter.go("/earn") })), skynode_1.el(".bottom-menu", Config_1.default.chainId !== 1 ? skynode_1.el("a", "Test LP Token", { click: () => skyrouter_1.SkyRouter.go("/test-lp-token") }) : undefined, skynode_1.el("a", "Docs", { href: "https://medium.com/maid-coin", target: "_blank" }), skynode_1.el("a", "Open Source", { href: "https://github.com/maidcoingit", target: "_blank" })), skynode_1.el(".icon-menu", skynode_1.el("a", skynode_1.el("img", { src: "/images/component/mobile-menu/discord.png", height: "24" }), { href: "https://discord.gg/ZMWNjs6F3V", target: "_blank" }), skynode_1.el("a", skynode_1.el("img", { src: "/images/component/mobile-menu/telegram.png", height: "30.5" }), { href: "https://t.me/maidcoingroup", target: "_blank" }), skynode_1.el("a", skynode_1.el("img", { src: "/images/component/mobile-menu/twitter.png", height: "23.5" }), { href: "https://twitter.com/maid_coin", target: "_blank" })));
    }
}
exports.default = MobileMenu;
//# sourceMappingURL=MobileMenu.js.map