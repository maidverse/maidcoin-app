"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const AnyHousekeeperList_1 = __importDefault(require("../component/housekeeper/AnyHousekeeperList"));
const OwnedMaidList_1 = __importDefault(require("../component/maid/OwnedMaidList"));
const NursePartList_1 = __importDefault(require("../component/nurse-part/NursePartList"));
const NursePoolList_1 = __importDefault(require("../component/nurse-pool/NursePoolList"));
const Layout_1 = __importDefault(require("./Layout"));
class Dashboard {
    constructor() {
        Layout_1.default.current.changeBackground("/images/view/dashboard/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".dashboard-view", skynode_1.el("header", skynode_1.el("h2", "Dashboard"), skynode_1.el("p", "Manage your NFTs.")), skynode_1.el("section", skynode_1.el("h3", "Maid"), new OwnedMaidList_1.default()), skynode_1.el("section", skynode_1.el("h3", "Housekeeper"), new AnyHousekeeperList_1.default()), skynode_1.el("section", skynode_1.el("h3", "Clone Nurse"), new NursePoolList_1.default()), skynode_1.el("section", skynode_1.el("h3", "Nurse Part"), new NursePartList_1.default())));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map