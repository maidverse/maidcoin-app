"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class CreateNursePopup extends skynode_1.Popup {
    constructor(nurseType) {
        super(".popup-background");
        this.nurseType = nurseType;
        this.append(this.content = skynode_1.el(".create-nurse-popup", skynode_1.el("h1", "Create Nurse"), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/nurse-battery-popup/close-button.png", height: "25" }), {
            click: () => this.delete(),
        })));
        this.load();
    }
    async load() {
    }
}
exports.default = CreateNursePopup;
//# sourceMappingURL=CreateNursePopup.js.map