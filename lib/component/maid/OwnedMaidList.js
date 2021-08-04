"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const MaidContract_1 = __importDefault(require("../../contracts/MaidContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const Loading_1 = __importDefault(require("../Loading"));
const MaidSummary_1 = __importDefault(require("./MaidSummary"));
class OwnedMaidList extends skynode_1.DomNode {
    constructor() {
        super(".owned-maid-list");
        this.append(this.loading = new Loading_1.default(), this.maidContainer = skynode_1.el(".maid-container"));
        this.loadMaids();
    }
    async loadMaids() {
        new MaidSummary_1.default(0).appendTo(this.maidContainer);
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const maidCount = (await MaidContract_1.default.balanceOf(owner)).toNumber();
            skyutil_1.default.repeat(maidCount, (index) => {
                setTimeout(async () => {
                    if (this.deleted !== true) {
                        const maidIndex = maidCount - index - 1;
                        const maidId = (await MaidContract_1.default.getTokenOfOwnerByIndex(owner, maidIndex)).toNumber();
                        new MaidSummary_1.default(maidId).appendTo(this.maidContainer);
                    }
                }, index * 50);
            });
        }
        this.loading.delete();
    }
}
exports.default = OwnedMaidList;
//# sourceMappingURL=OwnedMaidList.js.map