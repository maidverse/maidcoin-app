"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const NursePartContract_1 = __importDefault(require("../../contracts/NursePartContract"));
const NetworkProvider_1 = __importDefault(require("../../ethereum/NetworkProvider"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
class Nurse extends skynode_1.DomNode {
    constructor(nurseId) {
        super(".nurse");
        this.nurseId = nurseId;
        this.partCount = 0;
        this.load();
    }
    async refreshLifetime() {
        if (this.endBlock !== undefined && this.currentBlockNumber !== undefined) {
            this.lifetime?.empty().appendText(CommonUtil_1.default.displayBlockDuration(this.endBlock - this.currentBlockNumber));
        }
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            this.currentBlockNumber = await NetworkProvider_1.default.getBlockNumber();
            const nurse = await CloneNursesContract_1.default.getNurse(this.nurseId);
            this.endBlock = nurse.endBlock;
            const nuserOwner = await CloneNursesContract_1.default.ownerOf(this.nurseId);
            const supportedPower = await CloneNursesContract_1.default.getSupportedPower(this.nurseId);
            const nurseType = StaticDataManager_1.default.getNurseType(nurse.nurseType);
            const nursePart = (await NursePartContract_1.default.balanceOf(owner, nurse.nurseType)).toNumber();
            this.empty().append(skynode_1.el(".slot", skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${nurseType.name}.png` }), skynode_1.el(".name", nurseType.name)), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(nuserOwner)}`), skynode_1.el(".lp-amount", "Supported LP : ", skynode_1.el("span", ethers_1.utils.formatEther(supportedPower))), this.lifetime = skynode_1.el(".lifetime"), skynode_1.el(".charge-form", skynode_1.el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType.name}.png`, height: "50" }), skynode_1.el(".input-container", skynode_1.el("img", { src: "/images/component/charge-multiple-nurse-popup/battery.png", height: "24" }), skynode_1.el("input", {
                change: (event, input) => {
                    const value = input.domElement.value;
                    this.partCount = parseInt(value, 10);
                    if (isNaN(this.partCount) === true) {
                        this.partCount = 0;
                    }
                    else if (this.partCount > nursePart) {
                        this.partCount = nursePart;
                        input.domElement.value = String(nursePart);
                    }
                },
            }), skynode_1.el("span", ` / ${nursePart}`))));
            this.refreshLifetime();
        }
    }
}
exports.default = Nurse;
//# sourceMappingURL=Nurse.js.map