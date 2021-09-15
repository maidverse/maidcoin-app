"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const Calculator_1 = __importDefault(require("../../Calculator"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const NursePartContract_1 = __importDefault(require("../../contracts/NursePartContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
class ChargeNursePopup extends skynode_1.Popup {
    constructor(nurseId) {
        super(".popup-background");
        this.nurseId = nurseId;
        this.append(this.content = skynode_1.el(".charge-nurse-popup", skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/nurse-battery-popup/close-button.png", height: "25" }), {
            click: () => this.delete(),
        }), skynode_1.el("h1", "Charge Nurse"), skynode_1.el("p", "Enter the number of nurse parts.")));
        this.load();
    }
    refreshLifetime() {
        if (this.nurseTypeInfo !== undefined && this.input !== undefined) {
            this.lifetime?.empty().appendText(CommonUtil_1.default.displayBlockDuration(Calculator_1.default.nurseLifetime(this.nurseTypeInfo.lifetime, this.nurseTypeInfo.partCount, parseInt(this.input.domElement.value, 10), false)));
        }
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const nurse = await CloneNursesContract_1.default.getNurse(this.nurseId);
            this.nurseTypeInfo = await CloneNursesContract_1.default.getNurseType(nurse.nurseType);
            const balance = (await NursePartContract_1.default.balanceOf(owner, nurse.nurseType)).toNumber();
            const result = await superagent_1.default.get(`https://api.maidcoin.org/nursetypes/${nurse.nurseType}`);
            const tokenInfo = result.body;
            this.content.append(skynode_1.el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${tokenInfo.name}.png`, height: "80" }), skynode_1.el(".part-count", this.input = skynode_1.el("input", {
                value: String(0),
                change: () => {
                    if (this.range !== undefined && this.input !== undefined) {
                        const currentValue = parseInt(this.input.domElement.value, 10);
                        if (currentValue < 0) {
                            this.input.domElement.value = String(0);
                        }
                        else if (currentValue > balance) {
                            this.input.domElement.value = String(balance);
                        }
                        this.range.domElement.value = this.input.domElement.value;
                    }
                    this.refreshLifetime();
                },
            }), ` / ${balance.toString()}`), this.range = skynode_1.el("input.range", {
                type: "range",
                value: String(0),
                min: "0",
                max: balance.toString(),
                change: () => {
                    if (this.input !== undefined && this.range !== undefined) {
                        this.input.domElement.value = this.range.domElement.value;
                    }
                    this.refreshLifetime();
                },
            }), skynode_1.el(".lifetime-container", skynode_1.el("img.icon", { src: "/images/component/nurse-battery-popup/battery.png", height: "22" }), this.lifetime = skynode_1.el(".lifetime")), skynode_1.el("a.charge-button", "Charge", {
                click: async () => {
                    if (this.input !== undefined) {
                        await CloneNursesContract_1.default.elongateLifetime([this.nurseId], [parseInt(this.input.domElement.value, 10)]);
                    }
                    this.delete();
                },
            }));
            this.refreshLifetime();
        }
    }
}
exports.default = ChargeNursePopup;
//# sourceMappingURL=ChargeNursePopup.js.map