"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Nurse extends skynode_1.DomNode {
    constructor(nurseId) {
        super(".nurse");
        this.nurseId = nurseId;
        this.appendText("TEST!");
    }
}
exports.default = Nurse;
//# sourceMappingURL=Nurse.js.map