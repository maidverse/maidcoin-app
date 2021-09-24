"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const NurseRaidContract_1 = __importDefault(require("../../contracts/NurseRaidContract"));
const NetworkProvider_1 = __importDefault(require("../../ethereum/NetworkProvider"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const Confirm_1 = __importDefault(require("../dialogue/Confirm"));
const SelectMaidPopup_1 = __importDefault(require("../select-maid-popup/SelectMaidPopup"));
class NurseRaid extends skynode_1.DomNode {
    constructor(raidId, currentBlockNumber) {
        super(".nurse-raid");
        this.raidId = raidId;
        this.currentBlockNumber = currentBlockNumber;
        this.done = false;
        this.enterHandler = async (challenger, id, maids, maidId) => {
            if (id.toNumber() === this.raidId && challenger === await Wallet_1.default.loadAddress()) {
                setTimeout(async () => {
                    this.currentBlockNumber = await NetworkProvider_1.default.getBlockNumber();
                    this.load();
                }, 3000);
            }
        };
        this.exitHandler = async (challenger, id) => {
            if (id.toNumber() === this.raidId && challenger === await Wallet_1.default.loadAddress()) {
                this.currentBlockNumber = await NetworkProvider_1.default.getBlockNumber();
                this.load();
            }
        };
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"), this.footer = skynode_1.el("footer"));
        this.load();
        NurseRaidContract_1.default.on("Enter", this.enterHandler);
        NurseRaidContract_1.default.on("Exit", this.exitHandler);
    }
    async load() {
        if (this.durationInterval !== undefined) {
            clearInterval(this.durationInterval);
            this.durationInterval = undefined;
        }
        const raid = StaticDataManager_1.default.getRaid(this.raidId);
        const nurseType = StaticDataManager_1.default.getNurseType(raid.nursePart);
        let duration;
        this.content.empty().append(skynode_1.el(".name", nurseType.name), skynode_1.el(".image", {
            style: {
                backgroundImage: `url(https://storage.googleapis.com/maidcoin/Nurse/Illust/${nurseType.name}.png)`,
                width: nurseType.width,
                backgroundPosition: `${nurseType.left}px calc(50% + ${nurseType.top + 56}px)`,
            },
        }), skynode_1.el(".end-time", `End ${CommonUtil_1.default.displayBlockDuration(raid.endBlock - this.currentBlockNumber)}`), skynode_1.el(".character", skynode_1.el("img", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${nurseType.name}Idle.png`, height: "85" })), skynode_1.el(".duration", skynode_1.el("span.title", "Duration"), duration = skynode_1.el("span", CommonUtil_1.default.displayBlockDuration(raid.duration))), skynode_1.el(".progress"));
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const challenger = await NurseRaidContract_1.default.getChallenger(this.raidId, owner);
            this.done = challenger.enterBlock !== 0 && await NurseRaidContract_1.default.checkDone(this.raidId) === true;
            if (this.done === true) {
                duration.empty().appendText("Done");
            }
            else {
                if (this.durationInterval !== undefined) {
                    clearInterval(this.durationInterval);
                }
                const refresh = async () => {
                    this.currentBlockNumber += 1 / 15;
                    const maidPower = challenger.maids === ethers_1.constants.AddressZero ? 1000 : await NurseRaidContract_1.default.powerOfMaids(challenger.maids, challenger.maidId);
                    duration.empty().appendText(CommonUtil_1.default.displayBlockDuration(raid.duration * (maidPower / 1000) - (this.currentBlockNumber - challenger.enterBlock)));
                };
                refresh();
                this.durationInterval = setInterval(() => refresh(), 1000);
            }
            this.footer.empty().append(skynode_1.el(".reward", skynode_1.el("h3", "Rewards"), skynode_1.el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType.name}.png`, height: "28" }), skynode_1.el(".count", `x 1 ~ ${raid.maxRewardCount}`)), challenger.enterBlock === 0 ? skynode_1.el("a.start-button", ethers_1.utils.formatEther(raid.entranceFee), skynode_1.el("img.icon", { src: "/images/maidcoin.png", height: "20.5" }), "Start", {
                click: () => new SelectMaidPopup_1.default(this.raidId),
            }) : (this.done === true ? skynode_1.el("a.exit-button", "Exit", {
                click: async () => {
                    await NurseRaidContract_1.default.exit([this.raidId]);
                },
            }) : skynode_1.el("a.cancel-button", "Cancel", {
                click: () => {
                    new Confirm_1.default("Cancel Raid", "Are you sure you want to cancel the raid? If you cancel, you will not receive any parts.", async () => {
                        await NurseRaidContract_1.default.exit([this.raidId]);
                    });
                },
            })));
        }
    }
    delete() {
        if (this.durationInterval !== undefined) {
            clearInterval(this.durationInterval);
        }
        NurseRaidContract_1.default.off("Enter", this.enterHandler);
        NurseRaidContract_1.default.off("Exit", this.exitHandler);
        super.delete();
    }
}
exports.default = NurseRaid;
//# sourceMappingURL=NurseRaid.js.map