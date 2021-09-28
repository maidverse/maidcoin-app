"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const ChargeMultipleNursePopup_1 = __importDefault(require("../charge-multiple-nurse-popup/ChargeMultipleNursePopup"));
const DeleteMultipleNursePopup_1 = __importDefault(require("../delete-multiple-nurse-popup/DeleteMultipleNursePopup"));
const Loading_1 = __importDefault(require("../Loading"));
const NursePool_1 = __importDefault(require("./NursePool"));
class NursePoolList extends skynode_1.DomNode {
    constructor() {
        super(".nurse-pool-list");
        this.connectHandler = () => {
            if (this.loading === undefined) {
                this.loadNursePools();
            }
        };
        this.append(this.loading = new Loading_1.default());
        this.loadNursePools();
        Wallet_1.default.on("connect", this.connectHandler);
    }
    async loadNursePools() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const nurses = {};
            const totalNurseIds = [];
            const nurseCount = (await CloneNursesContract_1.default.balanceOf(owner)).toNumber();
            const promises = [];
            skyutil_1.default.repeat(nurseCount, (index) => {
                promises.push((async () => {
                    const nurseId = (await CloneNursesContract_1.default.getTokenOfOwnerByIndex(owner, index)).toNumber();
                    const nurseInfo = await CloneNursesContract_1.default.getNurse(nurseId);
                    if (nurses[nurseInfo.nurseType] === undefined) {
                        nurses[nurseInfo.nurseType] = [];
                    }
                    nurses[nurseInfo.nurseType].push(nurseId);
                    totalNurseIds.push(nurseId);
                })());
            });
            await Promise.all(promises);
            if (this.deleted !== true) {
                for (const [nurseType, nurseIds] of Object.entries(nurses)) {
                    this.append(new NursePool_1.default(parseInt(nurseType, 10), nurseIds));
                }
                if (totalNurseIds.length > 0) {
                    this.append(skynode_1.el("footer", skynode_1.el("a.claim-all-button", "Claim All", {
                        click: async () => {
                            await CloneNursesContract_1.default.claim(totalNurseIds);
                        },
                    }), skynode_1.el("a.charge-all-button", "Charge All", {
                        click: () => new ChargeMultipleNursePopup_1.default(),
                    }), skynode_1.el("a.destroy-all-button", "Destroy All", {
                        click: () => new DeleteMultipleNursePopup_1.default(),
                    })));
                }
            }
        }
        if (this.deleted !== true) {
            this.loading?.delete();
            this.loading = undefined;
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        super.delete();
    }
}
exports.default = NursePoolList;
//# sourceMappingURL=NursePoolList.js.map