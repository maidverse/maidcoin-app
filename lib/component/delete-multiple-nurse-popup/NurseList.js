"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_1 = require("@ethersproject/bignumber");
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const Nurse_1 = __importDefault(require("./Nurse"));
class NurseList extends skynode_1.DomNode {
    constructor() {
        super(".nurse-list");
        this.checkedNurseIds = [];
        this.totalSelectedSupportedPower = bignumber_1.BigNumber.from(0);
        this.totalDestroyReturn = bignumber_1.BigNumber.from(0);
        this.loadAllNurses();
    }
    async loadAllNurses() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const nurseCount = (await CloneNursesContract_1.default.balanceOf(owner)).toNumber();
            this.empty();
            skyutil_1.default.repeat(nurseCount > 100 ? 100 : nurseCount, (index) => {
                setTimeout(async () => {
                    if (this.deleted !== true) {
                        const nurseId = await CloneNursesContract_1.default.getTokenOfOwnerByIndex(owner, index);
                        const nurse = new Nurse_1.default(this, nurseId.toNumber(), owner).appendTo(this);
                        nurse.toss("toggle", this);
                    }
                }, index * 50);
            });
        }
    }
}
exports.default = NurseList;
//# sourceMappingURL=NurseList.js.map