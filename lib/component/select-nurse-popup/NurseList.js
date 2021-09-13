"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const Nurse_1 = __importDefault(require("./Nurse"));
class NurseList extends skynode_1.DomNode {
    constructor() {
        super(".nurse-list");
        this.loadNurses();
    }
    async loadNurses() {
        const nurseCount = await CloneNursesContract_1.default.getTotalSupply();
        skyutil_1.default.repeat(nurseCount.toNumber(), async (nurseId) => {
            new Nurse_1.default(nurseId).appendTo(this);
        });
    }
}
exports.default = NurseList;
//# sourceMappingURL=NurseList.js.map