"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class DeleteMultipleNursePopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = skynode_1.el(".delete-multiple-nurse-popup"));
    }
}
exports.default = DeleteMultipleNursePopup;
//# sourceMappingURL=DeleteMultipleNursePopup.js.map