"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
class Nurse extends skynode_1.DomNode {
    constructor(nurseId, owner) {
        super(".nurse");
        this.nurseId = nurseId;
        this.owner = owner;
        this.changeSupportedPowerHandler = async (id) => {
            if (id.eq(this.nurseId) === true) {
                const supportedPower = await CloneNursesContract_1.default.getSupportedPower(this.nurseId);
                this.supportedPower?.empty().appendText(ethers_1.utils.formatEther(supportedPower));
            }
        };
        this.load();
        CloneNursesContract_1.default.on("ChangeSupportedPower", this.changeSupportedPowerHandler);
    }
    async load() {
        const nurse = await CloneNursesContract_1.default.getNurse(this.nurseId);
        const supportedPower = await CloneNursesContract_1.default.getSupportedPower(this.nurseId);
        const nurseType = StaticDataManager_1.default.getNurseType(nurse.nurseType);
        this.empty().append(skynode_1.el(".slot", skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${nurseType.name}.png` }), skynode_1.el(".name", nurseType.name)), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(this.owner)}`), skynode_1.el(".lp-amount", "Supported LP : ", this.supportedPower = skynode_1.el("span", ethers_1.utils.formatEther(supportedPower))), skynode_1.el("a.route-button", "Route", {
            click: async (event) => {
                event.stopPropagation();
                this.fireEvent("route", this.nurseId);
            },
        }));
    }
    delete() {
        CloneNursesContract_1.default.off("ChangeSupportedPower", this.changeSupportedPowerHandler);
        super.delete();
    }
}
exports.default = Nurse;
//# sourceMappingURL=Nurse.js.map