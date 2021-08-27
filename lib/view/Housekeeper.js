"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const SushiGirlList_1 = __importDefault(require("../component/housekeeper/sushigirl/SushiGirlList"));
const Layout_1 = __importDefault(require("./Layout"));
class Housekeeper {
    constructor(params) {
        Layout_1.default.current.changeBackground("/images/view/housekeeper/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".housekeeper-view", skynode_1.el(".category-area", this.categoryList = skynode_1.el(".category-list"))));
        this.load(params.type);
    }
    async load(type) {
        if (type === undefined) {
            type = "lingeriegirls";
        }
        this.categoryList.empty().append(skynode_1.el(`a${type === "lingeriegirls" ? ".on" : ""}.category`, "Lingerie Girls", { click: () => skyrouter_1.SkyRouter.go("/housekeeper/lingeriegirls") }), skynode_1.el(`a${type === "sushigirls" ? ".on" : ""}.category`, "Sushi Girls", { click: () => skyrouter_1.SkyRouter.go("/housekeeper/sushigirls") }));
        this.housekeeperList?.delete();
        if (type === "sushigirls") {
            this.container.append(this.housekeeperList = new SushiGirlList_1.default());
        }
    }
    changeParams(params, uri) {
        this.load(params.type);
    }
    close() {
        this.container.delete();
    }
}
exports.default = Housekeeper;
//# sourceMappingURL=Housekeeper.js.map