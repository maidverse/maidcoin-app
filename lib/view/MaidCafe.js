"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class MaidCafe {
    constructor() {
        Layout_1.default.current.changeBackground("/images/view/maid-cafe/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".maid-cafe-view", skynode_1.el("header", skynode_1.el("h2", "Maid Cafe"), skynode_1.el("p", "Maximize yield by staking $MAID for $OMU"))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MaidCafe;
//# sourceMappingURL=MaidCafe.js.map