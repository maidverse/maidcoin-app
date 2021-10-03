"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const skyutil_1 = __importDefault(require("skyutil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const Nurse_1 = __importDefault(require("./Nurse"));
class NurseList extends skynode_1.DomNode {
    constructor() {
        super(".nurse-list");
        this.loadAllNurses();
    }
    async loadAllNurses() {
        const nurseCount = (await CloneNursesContract_1.default.getTotalSupply()).toNumber();
        this.empty();
        skyutil_1.default.repeat(nurseCount > 100 ? 100 : nurseCount, (nurseId) => {
            setTimeout(async () => {
                if (this.deleted !== true) {
                    const owner = await CloneNursesContract_1.default.ownerOf(nurseId);
                    if (owner !== ethers_1.constants.AddressZero) {
                        const nurse = new Nurse_1.default(nurseId, owner).appendTo(this);
                        nurse.toss("route", this);
                    }
                }
            }, nurseId * 50);
        });
    }
    async find(owner) {
        const nurseCount = (await CloneNursesContract_1.default.balanceOf(owner)).toNumber();
        this.empty();
        skyutil_1.default.repeat(nurseCount > 100 ? 100 : nurseCount, (index) => {
            setTimeout(async () => {
                if (this.deleted !== true) {
                    const nurseId = await CloneNursesContract_1.default.getTokenOfOwnerByIndex(owner, index);
                    const nurse = new Nurse_1.default(nurseId.toNumber(), owner).appendTo(this);
                    nurse.toss("route", this);
                }
            }, index * 50);
        });
    }
}
exports.default = NurseList;
//# sourceMappingURL=NurseList.js.map