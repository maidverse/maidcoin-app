"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const Calculator_1 = __importDefault(require("../../Calculator"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const Config_1 = __importDefault(require("../../Config"));
const MaidCoinContract_1 = __importDefault(require("../../contracts/MaidCoinContract"));
const NurseRaidContract_1 = __importDefault(require("../../contracts/NurseRaidContract"));
const NetworkProvider_1 = __importDefault(require("../../ethereum/NetworkProvider"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const Alert_1 = __importDefault(require("../dialogue/Alert"));
const Confirm_1 = __importDefault(require("../dialogue/Confirm"));
const SelectMaidPopup_1 = __importDefault(require("../select-maid-popup/SelectMaidPopup"));
class NurseRaid extends skynode_1.DomNode {
    constructor(raidId, currentBlockNumber) {
        super(".nurse-raid");
        this.raidId = raidId;
        this.connectHandler = async () => {
            this.load(await NetworkProvider_1.default.getBlockNumber());
        };
        this.enterHandler = async (challenger, id, maids, maidId) => {
            if (id.toNumber() === this.raidId && challenger === await Wallet_1.default.loadAddress()) {
                this.load(await NetworkProvider_1.default.getBlockNumber());
            }
        };
        this.exitHandler = async (challenger, id) => {
            if (id.toNumber() === this.raidId && challenger === await Wallet_1.default.loadAddress()) {
                this.load(await NetworkProvider_1.default.getBlockNumber());
            }
        };
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"), this.footer = skynode_1.el("footer"));
        this.load(currentBlockNumber);
        Wallet_1.default.on("connect", this.connectHandler);
        NurseRaidContract_1.default.on("Enter", this.enterHandler);
        NurseRaidContract_1.default.on("Exit", this.exitHandler);
    }
    async getLeftBlocks(challenger) {
        const currentBlockNumber = await NetworkProvider_1.default.getBlockNumber();
        const raid = StaticDataManager_1.default.getRaid(this.raidId);
        const maidPower = challenger.maids === ethers_1.constants.AddressZero ? 0 : await NurseRaidContract_1.default.powerOfMaids(challenger.maids, challenger.maidId);
        const leftBlocks = Math.ceil(raid.duration * (1000 - maidPower) / 1000 - (currentBlockNumber - challenger.enterBlock));
        return leftBlocks;
    }
    async checkDone(owner) {
        const challenger = await NurseRaidContract_1.default.getChallenger(this.raidId, owner);
        const done = challenger.enterBlock !== 0 && await NurseRaidContract_1.default.checkDone(this.raidId) === true;
        if (done !== true) {
            return false;
        }
        return await this.getLeftBlocks(challenger) <= 0;
    }
    async load(currentBlockNumber) {
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
        }), skynode_1.el(".end-time", `End ${CommonUtil_1.default.displayBlockDuration(raid.endBlock - currentBlockNumber)}`), skynode_1.el(".character", skynode_1.el("img", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${nurseType.name}Idle.png`, height: "85" })), skynode_1.el(".reward", skynode_1.el("h3", "Rewards"), skynode_1.el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType.name}.png`, height: "36" }), skynode_1.el(".count", `x 1 ~ ${raid.maxRewardCount}`)), duration = skynode_1.el(".duration", skynode_1.el("span.title", "Duration "), skynode_1.el("span", CommonUtil_1.default.displayBlockDuration(raid.duration))), skynode_1.el(".progress"));
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const challenger = await NurseRaidContract_1.default.getChallenger(this.raidId, owner);
            let done = false;
            if (challenger.enterBlock > 0) {
                done = await this.checkDone(owner);
                if (done === true) {
                    duration.empty().appendText("Done");
                }
                else {
                    if (this.durationInterval !== undefined) {
                        clearInterval(this.durationInterval);
                    }
                    const refresh = async () => {
                        const leftBlocks = await this.getLeftBlocks(challenger);
                        if (leftBlocks <= 0) {
                            if (this.durationInterval !== undefined) {
                                clearInterval(this.durationInterval);
                                this.durationInterval = undefined;
                            }
                            setTimeout(async () => {
                                if (this.deleted !== true) {
                                    this.load(await NetworkProvider_1.default.getBlockNumber());
                                }
                            }, Config_1.default.blockTimeSecond * 1000);
                        }
                        else if (this.deleted !== true) {
                            duration.empty().append(skynode_1.el("span", String(leftBlocks)), skynode_1.el("span.title", ` ${leftBlocks === 1 ? "Block" : "Blocks"} Left`));
                        }
                    };
                    refresh();
                    this.durationInterval = setInterval(() => refresh(), Config_1.default.blockTimeSecond * 1000);
                }
            }
            const apr = raid.nursePart >= 6 ? await Calculator_1.default.nurseAPR(raid.nursePart) : await Calculator_1.default.nurseFullChargingAPR(raid.nursePart);
            this.footer.empty().append(skynode_1.el(".apr", "APR: ", skynode_1.el("span", `${CommonUtil_1.default.numberWithCommas(apr.toString())}%`)), challenger.enterBlock === 0 ? (currentBlockNumber >= raid.endBlock ? undefined :
                skynode_1.el("a.start-button", CommonUtil_1.default.displayPrice(raid.entranceFee), skynode_1.el("img.icon", { src: "/images/maidcoin.png", height: "20.5" }), "Start", {
                    click: async () => {
                        const balance = await MaidCoinContract_1.default.balanceOf(owner);
                        if (balance.lt(raid.entranceFee)) {
                            new Alert_1.default("Error", "Not enough $MAID.", "Confirm");
                        }
                        else {
                            new SelectMaidPopup_1.default(this.raidId);
                        }
                    },
                })) : (done === true ?
                skynode_1.el("a.exit-button", "Exit", { click: () => this.exit() }) :
                skynode_1.el("a.cancel-button", "Cancel", { click: () => this.exit() })));
        }
    }
    async exit() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const done = await this.checkDone(owner);
            if (done === true) {
                await NurseRaidContract_1.default.exit([this.raidId]);
            }
            else {
                new Confirm_1.default("Cancel Raid", "Are you sure you want to cancel the raid? If you cancel, you will not receive any parts.", "Go Ahead", async () => {
                    await NurseRaidContract_1.default.exit([this.raidId]);
                });
            }
        }
    }
    delete() {
        if (this.durationInterval !== undefined) {
            clearInterval(this.durationInterval);
        }
        Wallet_1.default.off("connect", this.connectHandler);
        NurseRaidContract_1.default.off("Enter", this.enterHandler);
        NurseRaidContract_1.default.off("Exit", this.exitHandler);
        super.delete();
    }
}
exports.default = NurseRaid;
//# sourceMappingURL=NurseRaid.js.map