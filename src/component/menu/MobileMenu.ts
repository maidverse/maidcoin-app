import { ClosableFloatingDomNode, el, Position } from "@hanul/skynode";
import Config from "../../Config";
import ViewUtil from "../../view/ViewUtil";
import menu from "./menu.json";
import MenuBuilder from "./MenuBuilder";

export default class MobileMenu extends ClosableFloatingDomNode {

    constructor(position: Position) {
        super(position, ".mobile-menu");
        this.append(
            el("a.menu-icon", el("img", { src: "/images/view/layout/menu-button.png", height: "16" }), {
                click: () => this.delete(),
            }),
            el(".top-menu",
                ...MenuBuilder.build(menu.menu),
            ),
            el(".bottom-menu",
                Config.chainId !== 1 ? el("a", "Test LP Token", { click: () => ViewUtil.go("/test/test-lp-token") }) : undefined,
                Config.chainId !== 1 ? el("a", "Test $MAID", { click: () => ViewUtil.go("/test/test-maidcoin") }) : undefined,
                el("a", "Docs", { href: "https://medium.com/maid-coin", target: "_blank" }),
                el("a", "Open Source", { href: "https://github.com/maidcoingit", target: "_blank" }),
            ),
            el(".icon-menu",
                el("a", el("img", { src: "/images/component/mobile-menu/discord.png", height: "24" }), { href: "https://discord.gg/ZMWNjs6F3V", target: "_blank" }),
                el("a", el("img", { src: "/images/component/mobile-menu/telegram.png", height: "30.5" }), { href: "https://t.me/maidcoingroup", target: "_blank" }),
                el("a", el("img", { src: "/images/component/mobile-menu/twitter.png", height: "23.5" }), { href: "https://twitter.com/maid_coin", target: "_blank" }),
            ),
        );
        this.onDom("click", () => this.delete());
    }
}
