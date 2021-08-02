"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyrouter_1 = require("skyrouter");
class PCMenu extends skynode_1.DomNode {
    constructor() {
        super(".pc-menu");
        this.load = () => {
            this.empty().append(skynode_1.el(`a${location.pathname === "/" ? ".on" : ""}`, "Dashboard", { click: () => skyrouter_1.SkyRouter.go("/") }), skynode_1.el(`a${location.pathname === "/maid" ? ".on" : ""}`, "Maid", { click: () => skyrouter_1.SkyRouter.go("/maid") }), skynode_1.el(`a${location.pathname === "/nurseraid" ? ".on" : ""}`, "Nurse Raid", { click: () => skyrouter_1.SkyRouter.go("/nurseraid") }), skynode_1.el(`a${location.pathname === "/nursefactory" ? ".on" : ""}`, "Nurse Factory", { click: () => skyrouter_1.SkyRouter.go("/nursefactory") }), skynode_1.el(`a${location.pathname === "/earn" ? ".on" : ""}`, "Earn", { click: () => skyrouter_1.SkyRouter.go("/earn") }));
        };
        this.load();
        window.addEventListener("popstate", this.load);
    }
    delete() {
        window.removeEventListener("popstate", this.load);
        super.delete();
    }
}
exports.default = PCMenu;
//# sourceMappingURL=PCMenu.js.map