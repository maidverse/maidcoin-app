import { BodyNode, DomNode, el } from "@hanul/skynode";
import { View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import MobileMenu from "../component/menu/MobileMenu";
import MoreMenu from "../component/menu/MoreMenu";
import PCMenu from "../component/menu/PCMenu";
import UserInfo from "../component/UserInfo";
import ViewUtil from "./ViewUtil";

export default class Layout implements View {

    public static current: Layout;

    private container: DomNode;
    public content: DomNode;
    constructor() {
        Layout.current = this;
        BodyNode.append(this.container = el(".layout",
            el("header",
                el("a.menu-button", el("img", { src: "/images/view/layout/menu-button.png", height: "16" }), {
                    click: (event, button) => {
                        const rect = button.rect;
                        new MobileMenu({ left: rect.left - 4, top: rect.top - 4 }).appendTo(BodyNode);
                    },
                }),
                el("h1", el("a",
                    el("img.pc-logo", { src: "/images/view/layout/pc-logo.png", height: "24" }),
                    el("img.mobile-logo", { src: "/images/view/layout/mobile-logo.png", height: "28" }),
                    { click: () => ViewUtil.go("/") },
                )),
                new PCMenu(),
                el(".span"),
                new UserInfo(),
                el("a.more-button", el("img", { src: "/images/view/layout/more-button.png", height: "24" }), {
                    click: (event, button) => {
                        const rect = button.rect;
                        new MoreMenu({ left: rect.right - 200, top: rect.top + 36 }).appendTo(BodyNode);
                    },
                }),
            ),
            el("main",
                this.content = el(".content"),
            ),
        ));
    }

    public changeBackground(src: string, top: string = "bottom") {
        this.container.style({ backgroundImage: `url(${src})`, backgroundPositionY: top });
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
