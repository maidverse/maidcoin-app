"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
const menu_json_1 = __importDefault(require("./menu.json"));
const MenuBuilder_1 = __importDefault(require("./MenuBuilder"));
class PCMenu extends skynode_1.DomNode {
    constructor() {
        super(".pc-menu");
        this.load = () => {
            this.empty().append(...MenuBuilder_1.default.build(menu_json_1.default.menu));
        };
        this.load();
        skyrouter_1.SkyRouter.on("go", this.load);
    }
    delete() {
        skyrouter_1.SkyRouter.off("go", this.load);
        super.delete();
    }
}
exports.default = PCMenu;
//# sourceMappingURL=PCMenu.js.map