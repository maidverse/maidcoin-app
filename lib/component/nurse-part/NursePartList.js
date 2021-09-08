"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const NursePartContract_1 = __importDefault(require("../../contracts/NursePartContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const NursePart_1 = __importDefault(require("./NursePart"));
class NursePartList extends skynode_1.DomNode {
    constructor() {
        super(".nurse-part-list");
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"));
        this.loadNurseParts();
    }
    async loadNurseParts() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const nurseTypeCount = (await CloneNursesContract_1.default.getNurseTypeCount()).toNumber();
            skyutil_1.default.repeat(nurseTypeCount, async (nurseType) => {
                const nursePartCount = (await NursePartContract_1.default.balanceOf(owner, nurseType)).toNumber();
                this.content.append(new NursePart_1.default(nurseType, nursePartCount));
            });
        }
    }
}
exports.default = NursePartList;
//# sourceMappingURL=NursePartList.js.map