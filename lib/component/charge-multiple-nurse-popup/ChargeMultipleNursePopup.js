"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const NurseList_1 = __importDefault(require("./NurseList"));
class ChargeMultipleNursePopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = skynode_1.el(".charge-multiple-nurse-popup", skynode_1.el("h1", "Charge Nurses"), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/charge-multiple-nurse-popup/close-button.png", height: "22.5" }), {
            click: () => this.delete(),
        }), new NurseList_1.default(), skynode_1.el("footer", skynode_1.el("a.confirm-button", "Close", { click: () => this.delete() }))));
    }
}
exports.default = ChargeMultipleNursePopup;
//# sourceMappingURL=ChargeMultipleNursePopup.js.map