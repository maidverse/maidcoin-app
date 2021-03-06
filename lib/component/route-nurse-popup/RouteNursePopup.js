"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const NurseList_1 = __importDefault(require("./NurseList"));
class RouteNursePopup extends skynode_1.Popup {
    constructor(supportedLP, route) {
        super(".popup-background");
        let addressInput;
        let nurseList;
        this.append(this.content = skynode_1.el(".route-nurse-popup", skynode_1.el("h1", "Delete Nurse"), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/route-nurse-popup/close-button.png", height: "22.5" }), {
            click: () => this.delete(),
        }), skynode_1.el(".supported-lp", "Supported LP: ", skynode_1.el("span", CommonUtil_1.default.displayPrice(supportedLP))), skynode_1.el("main", skynode_1.el("h2", "Route Nurse"), skynode_1.el(".search", addressInput = skynode_1.el("input", { placeholder: "0x12345..." }), skynode_1.el("a.search-button", skynode_1.el("img", { src: "/images/component/select-nurse-popup/search-button.png", height: "32.5" }), {
            click: () => {
                const address = addressInput.domElement.value.trim();
                if (address === "") {
                    nurseList.loadAllNurses();
                }
                else {
                    nurseList.find(address);
                }
            },
        })), nurseList = new NurseList_1.default()), skynode_1.el("footer", skynode_1.el("a.confirm-button", "Close", { click: () => this.delete() }))));
        nurseList.on("route", (nurseId) => {
            route(nurseId);
            this.delete();
        });
    }
}
exports.default = RouteNursePopup;
//# sourceMappingURL=RouteNursePopup.js.map