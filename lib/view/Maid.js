"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const MaidList_1 = __importDefault(require("../component/maid/MaidList"));
const Layout_1 = __importDefault(require("./Layout"));
class Maid {
    constructor() {
        Layout_1.default.current.changeBackground("/images/view/maid/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".maid-view", skynode_1.el("header", skynode_1.el("h2", "Maids"), skynode_1.el("p", "Maids helps humanity fight the Nurse.")), new MaidList_1.default()));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Maid;
//# sourceMappingURL=Maid.js.map