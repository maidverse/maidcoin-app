"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Config_1 = __importDefault(require("../../Config"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
class MoreMenu extends skynode_1.ClosableFloatingDomNode {
    constructor(position) {
        super(position, ".more-menu");
        this.append(Config_1.default.chainId !== 1 ? skynode_1.el("a", "Test LP Token", { click: () => ViewUtil_1.default.go("/test/test-lp-token") }) : undefined, Config_1.default.chainId !== 1 ? skynode_1.el("a", "Test $MAID", { click: () => ViewUtil_1.default.go("/test/test-maidcoin") }) : undefined, skynode_1.el("a", "Docs", { href: "https://medium.com/maid-coin", target: "_blank" }), skynode_1.el("a", "Open Source", { href: "https://github.com/maidcoingit", target: "_blank" }), skynode_1.el("a", "Discord", { href: "https://discord.gg/ZMWNjs6F3V", target: "_blank" }), skynode_1.el("a", "Telegram", { href: "https://t.me/maidcoingroup", target: "_blank" }), skynode_1.el("a", "Twitter", { href: "https://twitter.com/maid_coin", target: "_blank" }));
    }
}
exports.default = MoreMenu;
//# sourceMappingURL=MoreMenu.js.map