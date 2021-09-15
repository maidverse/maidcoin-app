"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Alert_1 = __importDefault(require("./Alert"));
const Dialogue_1 = __importDefault(require("./Dialogue"));
class TokenPrompt extends Dialogue_1.default {
    constructor(title, message, confirmTitle, min, balance, confirm) {
        super(".token-prompt", title, confirmTitle, () => {
            const value = ethers_1.utils.parseEther(this.input.domElement.value);
            if (value.lt(min)) {
                new Alert_1.default("Error", `Minimum value is ${ethers_1.utils.formatEther(min)}`, "Confirm");
                return false;
            }
            else if (value.gt(balance)) {
                new Alert_1.default("Error", `Balance is ${ethers_1.utils.formatEther(balance)}`, "Confirm");
                return false;
            }
            else {
                confirm(value);
            }
        });
        this.content.append(skynode_1.el("p", message), this.input = skynode_1.el("input.input", { placeholder: `Balance: ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(balance))}` }), skynode_1.el("a.max-button", "Max", {
            click: () => this.input.domElement.value = ethers_1.utils.formatEther(balance),
        }));
        this.input.domElement.focus();
    }
}
exports.default = TokenPrompt;
//# sourceMappingURL=TokenPrompt.js.map