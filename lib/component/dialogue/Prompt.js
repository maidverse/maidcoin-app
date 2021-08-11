"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dialogue_1 = __importDefault(require("./Dialogue"));
class Prompt extends Dialogue_1.default {
    constructor(title, confirmTitle, confirm) {
        super(".prompt", title, confirmTitle, confirm);
    }
}
exports.default = Prompt;
//# sourceMappingURL=Prompt.js.map