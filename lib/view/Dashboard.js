"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Layout_1 = __importDefault(require("./Layout"));
class Dashboard {
    constructor() {
        Layout_1.default.current.changeBackground("/images/view/dashboard/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".dashboard-view"));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map