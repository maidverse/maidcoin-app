"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const Nurse_1 = __importDefault(require("./Nurse"));
class NurseList extends skynode_1.DomNode {
    constructor() {
        super(".nurse-list");
        this.loadAllNurses();
    }
    get partCounts() {
        const partCounts = {};
        for (const child of this.children) {
            if (child instanceof Nurse_1.default) {
                partCounts[child.nurseId] = child.partCount;
            }
        }
        return partCounts;
    }
    async loadAllNurses() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const nurseCount = await CloneNursesContract_1.default.balanceOf(owner);
            this.empty();
            skyutil_1.default.repeat(nurseCount.toNumber(), async (index) => {
                const nurseId = await CloneNursesContract_1.default.getTokenOfOwnerByIndex(owner, index);
                const nurse = new Nurse_1.default(nurseId.toNumber(), owner).appendTo(this);
                nurse.toss("toggle", this);
            });
        }
    }
}
exports.default = NurseList;
//# sourceMappingURL=NurseList.js.map