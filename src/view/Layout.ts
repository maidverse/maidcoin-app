import { BodyNode, DomNode, el } from "@hanul/skynode";
import { SkyRouter, View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import UserInfo from "../component/UserInfo";

export default class Layout implements View {

    public static current: Layout;

    private container: DomNode;
    private menuList: DomNode;
    public content: DomNode;

    private showingNav = false;

    constructor() {
        Layout.current = this;
        BodyNode.append(this.container = el(".layout",
            el("header",
                el("a.menu-button", el("img", { src: "/images/view/layout/menu-button.png", height: "16" }), {
                    click: (event: MouseEvent, button) => {
                        if (this.showingNav === true) {
                            this.menuList.style({ display: "none" });
                            button.deleteClass("fa-times");
                            button.addClass("fa-bars");
                        } else {
                            this.menuList.style({ display: "block" });
                            button.deleteClass("fa-bars");
                            button.addClass("fa-times");
                        }
                        this.showingNav = this.showingNav !== true;
                        event.stopPropagation();
                    },
                }),
                el("h1",
                    el("a", el("img", { src: "/images/view/layout/logo.png", height: "24" }), { click: () => SkyRouter.go("/") }),
                ),
                this.menuList = el("nav",
                    el("a", "Home", { click: () => SkyRouter.go("/") }),
                    el("a", "Maid", { click: () => SkyRouter.go("/maid") }),
                    el("a", "Nurse", { click: () => SkyRouter.go("/nurse") }),
                    el("a", "Earn", { click: () => SkyRouter.go("/earn") }),
                    el("a", "Test LP Token", { click: () => SkyRouter.go("/test-lp-token") }),
                ),
                el(".span"),
                new UserInfo(),
                el("a.more-button", el("img", { src: "/images/view/layout/more-button.png", height: "24" })),
            ),
            el("main",
                this.content = el(".content"),
            ),
        ));

        BodyNode.onDom("click", this.bodyClickHandler);
    }

    private bodyClickHandler = () => {
    };

    public changeBackground(src: string) {
        this.container.style({ backgroundImage: `url(${src})` });
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
        BodyNode.offDom("click", this.bodyClickHandler);
    }
}
