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
class CreateNursePopup extends skynode_1.Popup {
    constructor(nurseType) {
        super(".popup-background");
        this.nurseType = nurseType;
        this.append(this.content = skynode_1.el(".create-nurse-popup", skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/nurse-battery-popup/close-button.png", height: "25" }), {
            click: () => this.delete(),
        }), skynode_1.el("h1", "Create Nurse"), skynode_1.el("p", "Enter the number of nurse parts.")));
        this.load();
    }
    refreshLifetime() {
        if (this.nurseTypeInfo !== undefined && this.input !== undefined) {
            this.lifetime?.empty().appendText(CommonUtil_1.default.displayBlockDuration(Calculator_1.default.nurseLifetime(this.nurseTypeInfo.lifetime, this.nurseTypeInfo.partCount, parseInt(this.input.domElement.value, 10))));
        }
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            this.nurseTypeInfo = await CloneNursesContract_1.default.getNurseType(this.nurseType);
            const balance = (await NursePartContract_1.default.balanceOf(owner, this.nurseType)).toNumber();
            const result = await superagent_1.default.get(`https://api.maidcoin.org/nursetypes/${this.nurseType}`);
            const tokenInfo = result.body;
            const rangePercent = 100 - this.nurseTypeInfo.partCount / balance * 100;
            this.content.append(skynode_1.el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${tokenInfo.name}.png`, height: "80" }), skynode_1.el(".part-count", this.input = skynode_1.el("input", {
                value: String(this.nurseTypeInfo.partCount),
                change: () => {
                    if (this.range !== undefined && this.input !== undefined && this.nurseTypeInfo !== undefined) {
                        const currentValue = parseInt(this.input.domElement.value, 10);
                        if (currentValue < this.nurseTypeInfo.partCount) {
                            this.input.domElement.value = String(this.nurseTypeInfo.partCount);
                        }
                        else if (currentValue > balance) {
                            this.input.domElement.value = String(balance);
                        }
                        this.range.domElement.value = this.input.domElement.value;
                    }
                    this.refreshLifetime();
                },
            }), ` / ${this.nurseTypeInfo.partCount}`), skynode_1.el(".range-info", skynode_1.el(".assemble-range", "Assemble", { style: { width: `${100 - rangePercent}%` } }), skynode_1.el(".battery-range", "Battery")), skynode_1.el(".range-container", skynode_1.el(".assemble-range", { style: { width: `${100 - rangePercent}%` } }), this.range = skynode_1.el("input.range", {
                style: { width: `${rangePercent}%` },
                type: "range",
                min: String(this.nurseTypeInfo.partCount),
                value: String(this.nurseTypeInfo.partCount),
                max: balance.toString(),
                change: () => {
                    if (this.input !== undefined && this.range !== undefined) {
                        this.input.domElement.value = this.range.domElement.value;
                    }
                    this.refreshLifetime();
                },
            })), skynode_1.el(".lifetime-container", skynode_1.el("img.icon", { src: "/images/component/nurse-battery-popup/battery.png", height: "22" }), this.lifetime = skynode_1.el(".lifetime")), skynode_1.el("a.create-button", "Create", {
                click: async () => {
                    if (this.input !== undefined) {
                        await CloneNursesContract_1.default.assemble(this.nurseType, parseInt(this.input.domElement.value, 10));
                    }
                    this.delete();
                },
            }));
            this.refreshLifetime();
        }
    }
}
exports.default = CreateNursePopup;
//# sourceMappingURL=CreateNursePopup.js.map