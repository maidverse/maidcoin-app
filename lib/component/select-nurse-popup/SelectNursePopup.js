"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const NurseList_1 = __importDefault(require("./NurseList"));
class SelectNursePopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        this.append(this.content = skynode_1.el(".select-nurse-popup", skynode_1.el("h1", "Select Nurse"), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/select-nurse-popup/close-button.png", height: "25" }), {
            click: () => this.delete(),
        }), skynode_1.el("main", new NurseList_1.default()), skynode_1.el("footer", skynode_1.el("a.confirm-button", "Close", { click: () => this.delete() }))));
    }
}
exports.default = SelectNursePopup;
//# sourceMappingURL=SelectNursePopup.js.map