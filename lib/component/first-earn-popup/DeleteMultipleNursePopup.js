"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const RouteNursePopup_1 = __importDefault(require("../route-nurse-popup/RouteNursePopup"));
const NurseList_1 = __importDefault(require("./NurseList"));
class DeleteMultipleNursePopup extends skynode_1.Popup {
    constructor() {
        super(".popup-background");
        let nurseList;
        this.append(this.content = skynode_1.el(".delete-multiple-nurse-popup", skynode_1.el("h1", "Destroy Nurses"), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/delete-multiple-nurse-popup/close-button.png", height: "22.5" }), {
            click: () => this.delete(),
        }), nurseList = new NurseList_1.default(), skynode_1.el("footer", skynode_1.el(".destroy-return", skynode_1.el("img", { src: "/images/component/delete-multiple-nurse-popup/maidcoin.png", height: "20.5" }), this.destroyReturn = skynode_1.el("span.amount", "+ 0")), skynode_1.el("a.delete-button", "Destroy", {
            click: () => {
                new RouteNursePopup_1.default(nurseList.totalSelectedSupportedPower, async (toNurseId) => {
                    await CloneNursesContract_1.default.destroy(nurseList.checkedNurseIds, [toNurseId]);
                    this.delete();
                });
            },
        }))));
        nurseList.on("toggle", () => {
            this.destroyReturn.empty().appendText(`+ ${CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(nurseList.totalDestroyReturn))}`);
        });
    }
}
exports.default = DeleteMultipleNursePopup;
//# sourceMappingURL=DeleteMultipleNursePopup.js.map