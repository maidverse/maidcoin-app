"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class UnstakeTab extends skynode_1.DomNode {
    constructor() {
        super(".tab.unstake-tab");
        this.append(skynode_1.el(".input-container", skynode_1.el("input"), skynode_1.el("a.max-button", "Max")), skynode_1.el("a.stake-button", "Unstake"));
        this.loadBalance();
    }
    async loadBalance() {
    }
}
exports.default = UnstakeTab;
//# sourceMappingURL=UnstakeTab.js.map