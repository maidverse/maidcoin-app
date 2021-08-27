"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Dialogue extends skynode_1.Popup {
    constructor(tag, title, confirmTitle, confirm) {
        super(".popup-background");
        this.append(this.content = skynode_1.el(`.dialogue${tag}`, skynode_1.el("h1", title), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/dialogue/close-button.png", height: "25" }), {
            click: () => this.delete(),
        }), skynode_1.el("a.cancel-button", "Cancel", {
            click: () => this.delete(),
        }), skynode_1.el("a.confirm-button", confirmTitle, {
            click: () => {
                confirm();
                this.delete();
            },
        })));
    }
}
exports.default = Dialogue;
//# sourceMappingURL=Dialogue.js.map