import { ClosableFloatingDomNode, el, Position } from "@hanul/skynode";
import { SkyRouter } from "skyrouter";
import Config from "../../Config";

export default class MoreMenu extends ClosableFloatingDomNode {

    constructor(position: Position) {
        super(position, ".more-menu");
        this.append(
            Config.chainId !== 1 ? el("a", "Test LP Token", { click: () => SkyRouter.go("/test-lp-token") }) : undefined,
            el("a", "Docs", { href: "https://medium.com/maid-coin", target: "_blank" }),
            el("a", "Open Source", { href: "https://github.com/maidcoingit", target: "_blank" }),
            el("a", "Discord", { href: "https://discord.gg/ZMWNjs6F3V", target: "_blank" }),
            el("a", "Telegram", { href: "https://t.me/maidcoingroup", target: "_blank" }),
            el("a", "Twitter", { href: "https://twitter.com/maid_coin", target: "_blank" }),
        );
    }
}
