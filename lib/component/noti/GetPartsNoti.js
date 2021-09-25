"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
class GetPartsNoti extends skynode_1.DomNode {
    constructor(partType, count) {
        super(".get-parts-noti");
        const nurseType = StaticDataManager_1.default.getNurseType(partType);
        this.append(skynode_1.el(".close-button", skynode_1.el("img", { src: "/images/component/noti/close-button.png" }, {
            click: () => this.delete(),
        })), skynode_1.el("h4", "Raid Completed"), skynode_1.el("p", "You've got"), skynode_1.el(".parts", skynode_1.el("img", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType.name}.png`, height: "60" }), skynode_1.el(".count", `x ${count}`)));
        this.appendTo(skynode_1.BodyNode);
    }
}
exports.default = GetPartsNoti;
//# sourceMappingURL=GetPartsNoti.js.map