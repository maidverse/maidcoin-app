"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const MaidsContract_1 = __importDefault(require("../../contracts/MaidsContract"));
const NurseRaidContract_1 = __importDefault(require("../../contracts/NurseRaidContract"));
const NetworkProvider_1 = __importDefault(require("../../ethereum/NetworkProvider"));
const Layout_1 = __importDefault(require("../Layout"));
class Admin {
    constructor() {
        let partCountInput;
        let destroyReturnInput;
        let powerInput;
        let lifetimeInput;
        let entranceFeeInput;
        let nursePartInput;
        let maxRewardCountInput;
        let durationInput;
        let endBlockInput;
        Layout_1.default.current.changeBackground("/images/view/maid/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".admin-view", skynode_1.el("h2", "Admin Console"), this.currentBlock = skynode_1.el(".current-block", "Current Block: Loading..."), skynode_1.el(".admin-form.maid-form", skynode_1.el("h3", "Maid"), skynode_1.el(".action-button-container", skynode_1.el("a.action-button.mint-maid-button", "Mint Maid", {
            click: async () => {
                const power = prompt("Please enter the maid's power", "50");
                if (power) {
                    await MaidsContract_1.default.mint(power);
                }
            },
        }))), skynode_1.el(".admin-form.nurse-type-form", skynode_1.el("h3", "Nurse Type"), skynode_1.el("label", "Part Count", partCountInput = skynode_1.el("input", { placeholder: "Part Count" })), skynode_1.el("label", "Destroy Return", destroyReturnInput = skynode_1.el("input", { placeholder: "Destroy Return" })), skynode_1.el("label", "Power", powerInput = skynode_1.el("input", { placeholder: "Power" })), skynode_1.el("label", "Lifetime", lifetimeInput = skynode_1.el("input", { placeholder: "Power" })), skynode_1.el(".action-button-container", skynode_1.el("a.action-button.create-nurse-type-button", "Create Nurse Type", {
            click: async () => {
                await CloneNursesContract_1.default.addNurseType(parseInt(partCountInput.domElement.value, 10), ethers_1.utils.parseEther(destroyReturnInput.domElement.value), parseInt(powerInput.domElement.value, 10), parseInt(lifetimeInput.domElement.value, 10));
            },
        }))), skynode_1.el(".admin-form.nurse-raid-form", skynode_1.el("h3", "Nurse Raid"), skynode_1.el("label", "Entrance Fee", entranceFeeInput = skynode_1.el("input", { placeholder: "Entrance Fee" })), skynode_1.el("label", "Nurse Part", nursePartInput = skynode_1.el("input", { placeholder: "Nurse Part" })), skynode_1.el("label", "Max Reward Count", maxRewardCountInput = skynode_1.el("input", { placeholder: "Max Reward Count" })), skynode_1.el("label", "Duration", durationInput = skynode_1.el("input", { placeholder: "Duration" })), skynode_1.el("label", "End Block", endBlockInput = skynode_1.el("input", { placeholder: "End Block" })), skynode_1.el(".action-button-container", skynode_1.el("a.action-button.create-nurse-raid-button", "Create Nurse Raid", {
            click: async () => {
                await NurseRaidContract_1.default.create(ethers_1.utils.parseEther(entranceFeeInput.domElement.value), parseInt(nursePartInput.domElement.value, 10), parseInt(maxRewardCountInput.domElement.value, 10), parseInt(durationInput.domElement.value, 10), parseInt(endBlockInput.domElement.value, 10));
            },
        })))));
        this.load();
    }
    async load() {
        const blockNumber = await NetworkProvider_1.default.getBlockNumber();
        this.currentBlock.empty().appendText(`Current Block: ${blockNumber}`);
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Admin;
//# sourceMappingURL=TestAdmin.js.map