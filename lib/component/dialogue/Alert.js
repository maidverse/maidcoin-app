"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Dialogue_1 = __importDefault(require("./Dialogue"));
class Alert extends Dialogue_1.default {
    constructor(title, message, confirmTitle, confirm) {
        super(".alert", title, confirmTitle, () => {
            if (confirm !== undefined) {
                confirm();
            }
        });
        this.content.append(skynode_1.el("p", message));
    }
}
exports.default = Alert;
//# sourceMappingURL=Alert.js.map