"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const MaidCafeContract_1 = __importDefault(require("../../contracts/MaidCafeContract"));
class UnstakeTab extends skynode_1.DomNode {
    constructor() {
        super(".tab.unstake-tab");
        this.append(skynode_1.el(".input-container", this.input = skynode_1.el("input"), skynode_1.el("a.max-button", "Max")), skynode_1.el("a.stake-button", "Unstake", {
            click: async () => {
                await MaidCafeContract_1.default.leave(ethers_1.utils.parseEther(this.input.domElement.value));
            },
        }));
        this.loadBalance();
    }
    async loadBalance() {
    }
}
exports.default = UnstakeTab;
//# sourceMappingURL=UnstakeTab.js.map