"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const MaidsContract_1 = __importDefault(require("../../contracts/MaidsContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const Maid_1 = __importDefault(require("./Maid"));
class MaidList extends skynode_1.DomNode {
    constructor() {
        super(".maid-list");
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"));
        this.loadMaids();
    }
    async loadMaids() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const maidCount = (await MaidsContract_1.default.balanceOf(owner)).toNumber();
            skyutil_1.default.repeat(maidCount, async (index) => {
                if (this.deleted !== true) {
                    const maidIndex = maidCount - index - 1;
                    const maidId = (await MaidsContract_1.default.getTokenOfOwnerByIndex(owner, maidIndex)).toNumber();
                    const maid = new Maid_1.default(maidId).appendTo(this.content);
                    maid.on("select", () => {
                        if (maid === this.selectedMaid) {
                            this.deselectMaid();
                            this.fireEvent("deselect");
                        }
                        else {
                            this.selectedMaid?.deselect();
                            this.selectedMaid = maid;
                            this.fireEvent("select", maidId);
                        }
                    });
                }
            });
        }
    }
    deselectMaid() {
        this.selectedMaid?.deselect();
        this.selectedMaid = undefined;
    }
}
exports.default = MaidList;
//# sourceMappingURL=MaidList.js.map