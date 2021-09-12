"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const MaidsContract_1 = __importDefault(require("../../contracts/MaidsContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const Loading_1 = __importDefault(require("../Loading"));
const MaidSummary_1 = __importDefault(require("./MaidSummary"));
class OwnedMaidList extends skynode_1.DomNode {
    constructor() {
        super(".owned-maid-list");
        this.connectHandler = () => {
            if (this.loading === undefined) {
                this.loadMaids();
            }
        };
        this.append(this.loading = new Loading_1.default(), this.maidContainer = skynode_1.el(".maid-container"));
        this.loadMaids();
        Wallet_1.default.on("connect", this.connectHandler);
    }
    async loadMaids() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const maidCount = (await MaidsContract_1.default.balanceOf(owner)).toNumber();
            skyutil_1.default.repeat(maidCount, (index) => {
                setTimeout(async () => {
                    const maidIndex = maidCount - index - 1;
                    const maidId = (await MaidsContract_1.default.getTokenOfOwnerByIndex(owner, maidIndex)).toNumber();
                    if (this.deleted !== true) {
                        new MaidSummary_1.default(maidId).appendTo(this.maidContainer);
                    }
                }, index * 50);
            });
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
exports.default = OwnedMaidList;
//# sourceMappingURL=OwnedMaidList.js.map