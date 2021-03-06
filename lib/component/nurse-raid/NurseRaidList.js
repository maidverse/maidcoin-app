"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const NurseRaidContract_1 = __importDefault(require("../../contracts/NurseRaidContract"));
const NetworkProvider_1 = __importDefault(require("../../ethereum/NetworkProvider"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const Loading_1 = __importDefault(require("../Loading"));
const NurseRaid_1 = __importDefault(require("./NurseRaid"));
class NurseRaidList extends skynode_1.DomNode {
    constructor() {
        super(".nurse-raid-list");
        this.append(this.loading = new Loading_1.default(), this.raidContainer = skynode_1.el(".raid-container"));
        this.loadRaids();
    }
    async getDoneRaids(owner) {
        const raidIds = [];
        const promises = [];
        for (const child of this.raidContainer.children) {
            promises.push((async () => {
                if (child instanceof NurseRaid_1.default && await child.checkDone(owner) === true) {
                    raidIds.push(child.raidId);
                }
            })());
        }
        await Promise.all(promises);
        return raidIds;
    }
    async loadRaids() {
        const currentBlockNumber = await NetworkProvider_1.default.getBlockNumber();
        let index = 0;
        skyutil_1.default.repeat(StaticDataManager_1.default.raidCount, async (raidId) => {
            if (this.deleted !== true) {
                const raid = StaticDataManager_1.default.getRaid(raidId);
                if (currentBlockNumber < raid.endBlock) {
                    setTimeout(() => {
                        new NurseRaid_1.default(raidId, currentBlockNumber).appendTo(this.raidContainer);
                    }, index * 50);
                    index += 1;
                }
                else {
                    const owner = await Wallet_1.default.loadAddress();
                    if (owner !== undefined) {
                        const challenger = await NurseRaidContract_1.default.getChallenger(raidId, owner);
                        if (challenger.enterBlock > 0) {
                            new NurseRaid_1.default(raidId, currentBlockNumber).appendTo(this.raidContainer);
                        }
                    }
                }
            }
        });
        this.loading.delete();
    }
}
exports.default = NurseRaidList;
//# sourceMappingURL=NurseRaidList.js.map