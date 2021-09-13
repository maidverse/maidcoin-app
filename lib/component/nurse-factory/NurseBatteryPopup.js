"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class NurseBatteryPopup extends skynode_1.Popup {
    constructor(nurseType) {
        super(".popup-background");
        this.nurseType = nurseType;
        this.append(this.content = skynode_1.el(".nurse-battery-popup", skynode_1.el("h1", "Create Nurse"), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/select-nurse-popup/close-button.png", height: "25" }), {
            click: () => this.delete(),
        })));
        this.load();
    }
    async load() {
    }
}
exports.default = NurseBatteryPopup;
//# sourceMappingURL=NurseBatteryPopup.js.map