"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const MaidCorp_1 = __importDefault(require("../component/maid-corp/MaidCorp"));
const NurseFarm_1 = __importDefault(require("../component/nurse-farm/NurseFarm"));
const Layout_1 = __importDefault(require("./Layout"));
class Farm {
    constructor() {
        Layout_1.default.current.changeBackground("/images/view/farm/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".farm-view", skynode_1.el("header", skynode_1.el("h2", "Farms"), skynode_1.el("p", "Earn $MAID!")), new MaidCorp_1.default(), new NurseFarm_1.default()));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Farm;
//# sourceMappingURL=Farm.js.map