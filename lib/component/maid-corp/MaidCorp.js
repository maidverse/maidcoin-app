"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const TheMasterContract_1 = __importDefault(require("../../contracts/TheMasterContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
class MaidCorp extends skynode_1.DomNode {
    constructor() {
        super(".maid-corp");
        this.connectHandler = () => {
            this.load();
        };
        this.append(skynode_1.el(".background"), skynode_1.el(".name", "Maid Corporation"), skynode_1.el("img.ada", { src: "/images/component/maid-corp/ada.png", height: "222.5" }), this.content = skynode_1.el(".content"), this.footer = skynode_1.el("footer"));
        this.load();
        Wallet_1.default.on("connect", this.connectHandler);
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const lpAmount = await TheMasterContract_1.default.getLPAmount(1, owner);
            const reward = await TheMasterContract_1.default.getPendingReward(1, owner);
            this.content.empty().append(skynode_1.el("a.claim-button", skynode_1.el("img.maidcoin", { src: "/images/component/maid-corp/maidcoin.png", height: "29" }), skynode_1.el("span.reward", ethers_1.utils.formatEther(reward))), skynode_1.el("a.withdraw-button", "Withdraw", {
                click: async () => {
                    const amount = prompt("How much amount to withdraw?", "10");
                    if (amount) {
                        await TheMasterContract_1.default.withdraw(1, ethers_1.utils.parseEther(amount));
                    }
                },
            }), skynode_1.el("a.deposit-button", "Deposit", {
                click: async () => {
                    const amount = prompt("How much amount to deposit?", "10");
                    if (amount) {
                        await TheMasterContract_1.default.deposit(1, ethers_1.utils.parseEther(amount));
                    }
                },
            }));
            this.footer.empty().append(skynode_1.el(".property.lp-amount", "Deposited LP: ", skynode_1.el("span", ethers_1.utils.formatEther(lpAmount))), skynode_1.el(".property.apr", "APR: ", skynode_1.el("span", "0%")));
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        super.delete();
    }
}
exports.default = MaidCorp;
//# sourceMappingURL=MaidCorp.js.map