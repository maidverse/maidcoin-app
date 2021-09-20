"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const NurseFactoryList_1 = __importDefault(require("../component/nurse-factory/NurseFactoryList"));
const Layout_1 = __importDefault(require("./Layout"));
class Nursefactory {
    constructor() {
        Layout_1.default.current.changeBackground("/images/view/nurse-factory/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".nurse-factory-view", skynode_1.el("header", skynode_1.el("h2", "Nurse Factories"), skynode_1.el("p", "You can make Clone Nurses with Nurse Parts.")), new NurseFactoryList_1.default()));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Nursefactory;
//# sourceMappingURL=NurseFactory.js.map