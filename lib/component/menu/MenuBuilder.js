"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
class MenuBuilder {
    build(menus) {
        const els = [];
        for (const menuItem of menus) {
            els.push(skynode_1.el(`a${location.pathname === `/${menuItem.uri}` ? ".on" : ""}`, menuItem.name, { click: () => ViewUtil_1.default.go(`/${menuItem.uri}`) }));
        }
        return els;
    }
}
exports.default = new MenuBuilder();
//# sourceMappingURL=MenuBuilder.js.map