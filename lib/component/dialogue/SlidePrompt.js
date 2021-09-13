"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const skynode_1 = require("@hanul/skynode");
const Dialogue_1 = __importDefault(require("./Dialogue"));
class SlidePrompt extends Dialogue_1.default {
    constructor(title, message, confirmTitle, min, max, confirm) {
        super(".slide-prompt", title, confirmTitle, () => {
            confirm(bignumber_1.BigNumber.from(this.input.domElement.value));
        });
        this.content.append(skynode_1.el("p", message), this.input = skynode_1.el("input.input"));
    }
}
exports.default = SlidePrompt;
//# sourceMappingURL=SlidePrompt.js.map