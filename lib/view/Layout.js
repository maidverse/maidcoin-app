"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const MobileMenu_1 = __importDefault(require("../component/menu/MobileMenu"));
const MoreMenu_1 = __importDefault(require("../component/menu/MoreMenu"));
const PCMenu_1 = __importDefault(require("../component/menu/PCMenu"));
const UserInfo_1 = __importDefault(require("../component/UserInfo"));
class Layout {
    constructor() {
        Layout.current = this;
        skynode_1.BodyNode.append(this.container = skynode_1.el(".layout", skynode_1.el("header", skynode_1.el("a.menu-button", skynode_1.el("img", { src: "/images/view/layout/menu-button.png", height: "16" }), {
            click: (event, button) => {
                const rect = button.rect;
                new MobileMenu_1.default({ left: rect.left, top: rect.top }).appendTo(skynode_1.BodyNode);
            },
        }), skynode_1.el("h1", skynode_1.el("a", skynode_1.el("img", { src: "/images/view/layout/logo.png", height: "24" }), { click: () => skyrouter_1.SkyRouter.go("/") })), new PCMenu_1.default(), skynode_1.el(".span"), new UserInfo_1.default(), skynode_1.el("a.more-button", skynode_1.el("img", { src: "/images/view/layout/more-button.png", height: "24" }), {
            click: (event, button) => {
                const rect = button.rect;
                new MoreMenu_1.default({ left: rect.right - 200, top: rect.top + 36 }).appendTo(skynode_1.BodyNode);
            },
        })), skynode_1.el("main", this.content = skynode_1.el(".content"))));
    }
    changeBackground(src) {
        this.container.style({ backgroundImage: `url(${src})` });
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map