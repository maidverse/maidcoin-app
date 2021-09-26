"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
class GetNurseNoti extends skynode_1.DomNode {
    constructor(_nurseType) {
        super(".get-nurse-noti");
        const nurseType = StaticDataManager_1.default.getNurseType(_nurseType);
        this.append(skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/noti/close-button.png", height: "19.5" }, {
            click: () => this.delete(),
        })), skynode_1.el("h4", "Assemble Completed"), skynode_1.el(".reward", skynode_1.el("p", "You've got"), skynode_1.el("img", { src: `https://storage.googleapis.com/maidcoin/Nurse/Illust/${nurseType.name}.png`, height: "60" })));
        this.appendTo(skynode_1.BodyNode);
        this.closeTimeout = setTimeout(() => this.close(), 5000);
    }
    close() {
        clearTimeout(this.closeTimeout);
        this.addClass("hide");
        setTimeout(() => this.delete(), 1000);
    }
}
exports.default = GetNurseNoti;
//# sourceMappingURL=GetNurseNoti.js.map