"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Noti extends skynode_1.DomNode {
    constructor(title, message) {
        super(".noti");
        this.append(skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/noti/close-button.png", height: "19.5" }, {
            click: () => this.close(),
        })), skynode_1.el("h4", title), skynode_1.el("p", message));
        this.appendTo(skynode_1.BodyNode);
        this.closeTimeout = setTimeout(() => this.close(), 5000);
    }
    close() {
        clearTimeout(this.closeTimeout);
        this.addClass("hide");
        setTimeout(() => this.delete(), 1000);
    }
}
exports.default = Noti;
//# sourceMappingURL=Noti.js.map