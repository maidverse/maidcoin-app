"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class ChargeMultipleNursePopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = skynode_1.el(".charge-multiple-nurse-popup"));
    }
}
exports.default = ChargeMultipleNursePopup;
//# sourceMappingURL=ChargeMultipleNursePopup.js.map