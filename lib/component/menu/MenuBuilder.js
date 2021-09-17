"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
class MenuBuilder {
    build(menus) {
        const els = [];
        for (const menuItem of menus) {
            els.push(skynode_1.el(`a${location.pathname === `/${menuItem.uri}` ? ".on" : ""}`, menuItem.name, { click: () => skyrouter_1.SkyRouter.go(`/${menuItem.uri}`) }));
        }
        return els;
    }
}
exports.default = new MenuBuilder();
//# sourceMappingURL=MenuBuilder.js.map