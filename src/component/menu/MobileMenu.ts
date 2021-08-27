import { ClosableFloatingDomNode, el, Position } from "@hanul/skynode";
import { SkyRouter } from "skyrouter";
import Config from "../../Config";

export default class MobileMenu extends ClosableFloatingDomNode {

    constructor(position: Position) {
        super(position, ".mobile-menu");
        this.append(
            el("a.menu-icon", el("img", { src: "/images/view/layout/menu-button.png", height: "16" }), {
                click: () => this.delete(),
            }),
            el(".top-menu",
                el(`a${location.pathname === "/" ? ".on" : ""}`, "Dashboard", { click: () => SkyRouter.go("/") }),
                el(`a${location.pathname === "/maid" ? ".on" : ""}`, "Maid", { click: () => SkyRouter.go("/maid") }),
                el(`a${location.pathname === "/housekeeper" ? ".on" : ""}`, "Housekeeper", { click: () => SkyRouter.go("/housekeeper") }),
                el(`a${location.pathname === "/nurseraid" ? ".on" : ""}`, "Nurse Raid", { click: () => SkyRouter.go("/nurseraid") }),
                el(`a${location.pathname === "/nursefactory" ? ".on" : ""}`, "Nurse Factory", { click: () => SkyRouter.go("/nursefactory") }),
                el(`a${location.pathname === "/farm" ? ".on" : ""}`, "Farm", { click: () => SkyRouter.go("/farm") }),
            ),
            el(".bottom-menu",
                Config.chainId !== 1 ? el("a", "Test LP Token", { click: () => SkyRouter.go("/test-lp-token") }) : undefined,
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
