"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const MaidCafeContract_1 = __importDefault(require("../../contracts/MaidCafeContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
class UnstakeTab extends skynode_1.DomNode {
    constructor() {
        super(".tab.unstake-tab");
        this.connectHandler = () => {
            this.loadBalance();
        };
        this.transferHandler = async (from, to, amount) => {
            const address = await Wallet_1.default.loadAddress();
            if (from === address || to === address) {
                this.loadBalance();
            }
        };
        this.append(skynode_1.el(".input-container", this.input = skynode_1.el("input"), skynode_1.el("a.max-button", "Max", {
            click: async () => {
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const balance = await MaidCafeContract_1.default.balanceOf(owner);
                    this.input.domElement.value = ethers_1.utils.formatEther(balance);
                }
            },
        })), skynode_1.el("a.confirm-button", "Unstake", {
            click: async () => {
                await MaidCafeContract_1.default.leave(ethers_1.utils.parseEther(this.input.domElement.value));
                this.input.domElement.value = "";
            },
        }));
        this.loadBalance();
        Wallet_1.default.on("connect", this.connectHandler);
        MaidCafeContract_1.default.on("Transfer", this.transferHandler);
    }
    async loadBalance() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const balance = await MaidCafeContract_1.default.balanceOf(owner);
            this.input.domElement.placeholder = `Balance: ${CommonUtil_1.default.displayPrice(balance)}`;
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        MaidCafeContract_1.default.off("Transfer", this.transferHandler);
        super.delete();
    }
}
exports.default = UnstakeTab;
//# sourceMappingURL=UnstakeTab.js.map