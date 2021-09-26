"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const LingerieGirlDetail_1 = __importDefault(require("../component/housekeeper/lingeriegirl/LingerieGirlDetail"));
const LingerieGirlList_1 = __importDefault(require("../component/housekeeper/lingeriegirl/LingerieGirlList"));
const SushiGirlDetail_1 = __importDefault(require("../component/housekeeper/sushigirl/SushiGirlDetail"));
const SushiGirlList_1 = __importDefault(require("../component/housekeeper/sushigirl/SushiGirlList"));
const Layout_1 = __importDefault(require("./Layout"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Housekeeper {
    constructor(params) {
        Layout_1.default.current.changeBackground("/images/view/housekeeper/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".housekeeper-view", skynode_1.el(".category-area", this.categoryList = skynode_1.el(".category-list"))));
        this.load(params.type, params.id);
    }
    async load(type, id) {
        if (type === undefined) {
            type = "lingeriegirls";
        }
        this.categoryList.empty().append(skynode_1.el(`a${type === "lingeriegirls" ? ".on" : ""}.category`, "Lingerie Girls", { click: () => ViewUtil_1.default.go("/housekeepers/lingeriegirls") }), skynode_1.el(`a${type === "sushigirls" ? ".on" : ""}.category`, "Sushi Girls", { click: () => ViewUtil_1.default.go("/housekeepers/sushigirls") }));
        this.housekeeperList?.delete();
        if (type === "lingeriegirls") {
            this.container.append(this.housekeeperList = new LingerieGirlList_1.default());
            if (id !== undefined) {
                new LingerieGirlDetail_1.default(parseInt(id, 10));
            }
        }
        else if (type === "sushigirls") {
            this.container.append(this.housekeeperList = new SushiGirlList_1.default());
            if (id !== undefined) {
                new SushiGirlDetail_1.default(parseInt(id, 10));
            }
        }
    }
    changeParams(params, uri) {
        this.load(params.type, params.id);
    }
    close() {
        this.container.delete();
    }
}
exports.default = Housekeeper;
//# sourceMappingURL=Housekeeper.js.map