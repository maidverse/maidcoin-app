"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const Calculator_1 = __importDefault(require("../../Calculator"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const LPTokenContract_1 = __importDefault(require("../../contracts/LPTokenContract"));
const TheMasterContract_1 = __importDefault(require("../../contracts/TheMasterContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const TokenPrompt_1 = __importDefault(require("../dialogue/TokenPrompt"));
class MaidCorp extends skynode_1.DomNode {
    constructor() {
        super(".maid-corp");
        this.connectHandler = () => {
            this.load();
        };
        this.depositHandler = (userId, pid, amount) => {
            if (pid.toNumber() === 1) {
                this.load();
            }
        };
        this.withdrawHandler = (userId, pid, amount) => {
            if (pid.toNumber() === 1) {
                this.load();
            }
        };
        this.append(skynode_1.el(".background"), skynode_1.el(".name", "Maid Corporation"), skynode_1.el("img.ada", { src: "/images/component/maid-corp/ada.png", height: "222.5" }), this.content = skynode_1.el(".content"), this.footer = skynode_1.el("footer"));
        this.load();
        Wallet_1.default.on("connect", this.connectHandler);
        TheMasterContract_1.default.on("Deposit", this.depositHandler);
        TheMasterContract_1.default.on("Withdraw", this.withdrawHandler);
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const lpAmount = await TheMasterContract_1.default.getUserLPAmount(1, owner);
            const reward = await TheMasterContract_1.default.getPendingReward(1, owner);
            const lpBalance = await LPTokenContract_1.default.balanceOf(owner);
            this.content.empty().append(skynode_1.el("a.claim-button", skynode_1.el("img.maidcoin", { src: "/images/component/maid-corp/maidcoin.png", height: "29" }), skynode_1.el("span.reward", ethers_1.utils.formatEther(reward))), skynode_1.el("a.withdraw-button", "Withdraw", {
                click: () => new TokenPrompt_1.default("Withdraw from MaidCorp", "How much amount to withdraw?", "Withdraw", 0, lpAmount, async (amount) => {
                    await TheMasterContract_1.default.withdraw(1, amount);
                }),
            }), skynode_1.el("a.deposit-button", "Deposit", {
                click: () => new TokenPrompt_1.default("Deposit to MaidCorp", "How much amount to deposit?", "Deposit", 0, lpBalance, async (amount) => {
                    await TheMasterContract_1.default.deposit(1, amount);
                }),
            }));
            const apr = await Calculator_1.default.apr(1);
            this.footer.empty().append(skynode_1.el(".property.lp-amount", "LP Deposited By Me: ", skynode_1.el("span", ethers_1.utils.formatEther(lpAmount))), skynode_1.el(".property.apr", "APR: ", skynode_1.el("span", `${CommonUtil_1.default.numberWithCommas(String(apr))}%`)));
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        TheMasterContract_1.default.off("Deposit", this.depositHandler);
        TheMasterContract_1.default.off("Withdraw", this.withdrawHandler);
        super.delete();
    }
}
exports.default = MaidCorp;
//# sourceMappingURL=MaidCorp.js.map