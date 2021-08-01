"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const NurseRaidContract_1 = __importDefault(require("../../contracts/NurseRaidContract"));
const Loading_1 = __importDefault(require("../Loading"));
const NurseRaid_1 = __importDefault(require("./NurseRaid"));
class NurseRaidList extends skynode_1.DomNode {
    constructor() {
        super(".nurse-raid-list");
        this.append(this.loading = new Loading_1.default(), this.raidContainer = skynode_1.el(".raid-container"));
        this.loadRaids();
    }
    async loadRaids() {
        const raidCount = (await NurseRaidContract_1.default.getRaidCount()).toNumber();
        skyutil_1.default.repeat(raidCount, async (raidId) => {
            new NurseRaid_1.default(raidId).appendTo(this.raidContainer);
        });
        this.loading.delete();
    }
}
exports.default = NurseRaidList;
//# sourceMappingURL=NurseRaidList.js.map