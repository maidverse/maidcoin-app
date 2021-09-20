"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const NurseRaidList_1 = __importDefault(require("../component/nurse-raid/NurseRaidList"));
const Layout_1 = __importDefault(require("./Layout"));
class NurseRaid {
    constructor() {
        Layout_1.default.current.changeBackground("/images/view/nurse-raid/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".nurse-raid-view", skynode_1.el("header", skynode_1.el("h2", "Nurse Raids"), skynode_1.el("p", "Defeat Nurses and get Nurse Parts.")), new NurseRaidList_1.default()));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = NurseRaid;
//# sourceMappingURL=NurseRaid.js.map