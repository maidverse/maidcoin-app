"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class MaidSummary extends skynode_1.DomNode {
    constructor(maidId) {
        super(".maid-summary");
        this.maidId = maidId;
        this.append(skynode_1.el(".background"));
        console.log(maidId);
    }
}
exports.default = MaidSummary;
//# sourceMappingURL=MaidSummary.js.map