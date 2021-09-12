"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class NurseBatteryPopup extends skynode_1.Popup {
    constructor(nurseType) {
        super(".popup-background");
        this.nurseType = nurseType;
        this.append(this.content = skynode_1.el(".nurse-battery-popup"));
        this.load();
    }
    async load() {
    }
}
exports.default = NurseBatteryPopup;
//# sourceMappingURL=NurseBatteryPopup.js.map