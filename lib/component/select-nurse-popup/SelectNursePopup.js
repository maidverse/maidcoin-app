"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class SelectNursePopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = skynode_1.el(".select-nurse-popup", skynode_1.el("h1", "Select Nurse"), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/select-nurse-popup/close-button.png", height: "25" }), {
            click: () => this.delete(),
        }), skynode_1.el("main"), skynode_1.el("footer")));
        this.load();
    }
    async load() {
    }
}
exports.default = SelectNursePopup;
//# sourceMappingURL=SelectNursePopup.js.map