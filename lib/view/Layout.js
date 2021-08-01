"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const UserInfo_1 = __importDefault(require("../component/UserInfo"));
class Layout {
    constructor() {
        this.showingNav = false;
        this.bodyClickHandler = () => {
        };
        Layout.current = this;
        skynode_1.BodyNode.append(this.container = skynode_1.el(".layout", skynode_1.el("header", skynode_1.el("a.menu-button", skynode_1.el("img", { src: "/images/view/layout/menu-button.png", height: "16" }), {
            click: (event, button) => {
                if (this.showingNav === true) {
                    this.menuList.style({ display: "none" });
                    button.deleteClass("fa-times");
                    button.addClass("fa-bars");
                }
                else {
                    this.menuList.style({ display: "block" });
                    button.deleteClass("fa-bars");
                    button.addClass("fa-times");
                }
                this.showingNav = this.showingNav !== true;
                event.stopPropagation();
            },
        }), skynode_1.el("h1", skynode_1.el("a", skynode_1.el("img", { src: "/images/view/layout/logo.png", height: "24" }), { click: () => skyrouter_1.SkyRouter.go("/") })), this.menuList = skynode_1.el("nav", skynode_1.el("a", "Dashboard", { click: () => skyrouter_1.SkyRouter.go("/") }), skynode_1.el("a", "Maid", { click: () => skyrouter_1.SkyRouter.go("/maid") }), skynode_1.el("a", "Nurse Raid", { click: () => skyrouter_1.SkyRouter.go("/nurseraid") }), skynode_1.el("a", "Nurse Factory", { click: () => skyrouter_1.SkyRouter.go("/nursefactory") }), skynode_1.el("a", "Earn", { click: () => skyrouter_1.SkyRouter.go("/earn") }), skynode_1.el("a", "Test LP Token", { click: () => skyrouter_1.SkyRouter.go("/test-lp-token") })), skynode_1.el(".span"), new UserInfo_1.default(), skynode_1.el("a.more-button", skynode_1.el("img", { src: "/images/view/layout/more-button.png", height: "24" }))), skynode_1.el("main", this.content = skynode_1.el(".content"))));
        skynode_1.BodyNode.onDom("click", this.bodyClickHandler);
    }
    changeBackground(src) {
        this.container.style({ backgroundImage: `url(${src})` });
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
        skynode_1.BodyNode.offDom("click", this.bodyClickHandler);
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map