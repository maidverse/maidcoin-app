"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const CloneNurseContract_1 = __importDefault(require("../../contracts/CloneNurseContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const NursePool_1 = __importDefault(require("./NursePool"));
class NursePoolList extends skynode_1.DomNode {
    constructor() {
        super(".nurse-pool-list");
        this.loadNursePools();
    }
    async loadNursePools() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const nurses = {};
            const nurseCount = (await CloneNurseContract_1.default.balanceOf(owner)).toNumber();
            const promises = [];
            skyutil_1.default.repeat(nurseCount, (index) => {
                promises.push((async () => {
                    const nurseId = (await CloneNurseContract_1.default.getTokenOfOwnerByIndex(owner, index)).toNumber();
                    const nurseInfo = await CloneNurseContract_1.default.getNurse(nurseId);
                    if (nurses[nurseInfo.nurseType] === undefined) {
                        nurses[nurseInfo.nurseType] = [];
                    }
                    nurses[nurseInfo.nurseType].push(nurseId);
                })());
            });
            await Promise.all(promises);
            for (const [nurseType, nurseIds] of Object.entries(nurses)) {
                this.append(new NursePool_1.default(parseInt(nurseType, 10), nurseIds));
            }
        }
    }
}
exports.default = NursePoolList;
//# sourceMappingURL=NursePoolList.js.map