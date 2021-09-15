"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class StakeTab extends skynode_1.DomNode {
    constructor() {
        super(".tab.stake-tab");
        this.append(skynode_1.el(".input-container", skynode_1.el("input"), skynode_1.el("a.max-button", "Max")), skynode_1.el("a.stake-button", "Stake"));
        this.loadBalance();
    }
    async loadBalance() {
    }
}
exports.default = StakeTab;
//# sourceMappingURL=StakeTab.js.map