"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const skyutil_1 = __importDefault(require("skyutil"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const NetworkProvider_1 = __importDefault(require("../../ethereum/NetworkProvider"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
class Nurse extends skynode_1.DomNode {
    constructor(nurseList, nurseId, owner) {
        super(".nurse");
        this.nurseId = nurseId;
        this.owner = owner;
        this.supportedPower = ethers_1.BigNumber.from(0);
        this.destroyReturn = ethers_1.BigNumber.from(0);
        this.elongateLifetimeHandler = (id, rechargedLifetime, lastEndBlock, newEndBlock) => {
            if (id.eq(this.nurseId) === true) {
                this.endBlock = newEndBlock.toNumber();
                this.refreshLifetime();
            }
        };
        this.changeSupportedPowerHandler = async (id) => {
            if (id.eq(this.nurseId) === true) {
                this.supportedPower = await CloneNursesContract_1.default.getSupportedPower(this.nurseId);
                this.supportedPowerDisplay?.empty().appendText(CommonUtil_1.default.displayPrice(this.supportedPower));
            }
        };
        this.transferHandler = async (from, to, id) => {
            if (to === ethers_1.constants.AddressZero && id.eq(this.nurseId) === true) {
                this.delete();
            }
        };
        const check = skynode_1.el("img.check", { src: "/images/component/delete-multiple-nurse-popup/unchecked.png", height: "21" }).appendTo(this);
        this.onDom("click", () => {
            if (nurseList.checkedNurseIds.includes(nurseId) !== true) {
                check.domElement.src = "/images/component/delete-multiple-nurse-popup/checked.png";
                nurseList.checkedNurseIds.push(nurseId);
                nurseList.totalSelectedSupportedPower = nurseList.totalSelectedSupportedPower.add(this.supportedPower);
                nurseList.totalDestroyReturn = nurseList.totalDestroyReturn.add(this.destroyReturn);
                this.addClass("selected");
            }
            else {
                check.domElement.src = "/images/component/delete-multiple-nurse-popup/unchecked.png";
                skyutil_1.default.pull(nurseList.checkedNurseIds, nurseId);
                nurseList.totalSelectedSupportedPower = nurseList.totalSelectedSupportedPower.sub(this.supportedPower);
                nurseList.totalDestroyReturn = nurseList.totalDestroyReturn.sub(this.destroyReturn);
                this.deleteClass("selected");
            }
            this.fireEvent("toggle");
        });
        this.load();
        CloneNursesContract_1.default.on("ElongateLifetime", this.elongateLifetimeHandler);
        CloneNursesContract_1.default.on("ChangeSupportedPower", this.changeSupportedPowerHandler);
        CloneNursesContract_1.default.on("Transfer", this.transferHandler);
    }
    async refreshLifetime() {
        if (this.endBlock !== undefined && this.currentBlockNumber !== undefined) {
            this.lifetime?.empty().appendText(CommonUtil_1.default.displayBlockDuration(this.endBlock - this.currentBlockNumber));
        }
    }
    async load() {
        this.currentBlockNumber = await NetworkProvider_1.default.getBlockNumber();
        const nurse = await CloneNursesContract_1.default.getNurse(this.nurseId);
        this.endBlock = nurse.endBlock;
        this.supportedPower = await CloneNursesContract_1.default.getSupportedPower(this.nurseId);
        const nurseType = StaticDataManager_1.default.getNurseType(nurse.nurseType);
        this.destroyReturn = nurseType.destroyReturn;
        this.append(skynode_1.el(".slot", skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${nurseType.name}.png` }), skynode_1.el(".name", nurseType.name)), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(this.owner)}`), skynode_1.el(".lp-amount", "Supported LP : ", this.supportedPowerDisplay = skynode_1.el("span", CommonUtil_1.default.displayPrice(this.supportedPower))), this.lifetime = skynode_1.el(".lifetime"));
        this.refreshLifetime();
    }
    delete() {
        CloneNursesContract_1.default.off("ElongateLifetime", this.elongateLifetimeHandler);
        CloneNursesContract_1.default.off("ChangeSupportedPower", this.changeSupportedPowerHandler);
        CloneNursesContract_1.default.off("Transfer", this.transferHandler);
        super.delete();
    }
}
exports.default = Nurse;
//# sourceMappingURL=Nurse.js.map