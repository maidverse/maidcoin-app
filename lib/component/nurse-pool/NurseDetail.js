"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class NurseDetail extends skynode_1.Popup {
    constructor() {
        super(".nurse-detail");
        this.append(this.content = skynode_1.el(".content"));
    }
}
exports.default = NurseDetail;
//# sourceMappingURL=NurseDetail.js.map