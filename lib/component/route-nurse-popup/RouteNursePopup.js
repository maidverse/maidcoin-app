"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class RouteNursePopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = skynode_1.el(".route-nurse-popup"));
    }
}
exports.default = RouteNursePopup;
//# sourceMappingURL=RouteNursePopup.js.map