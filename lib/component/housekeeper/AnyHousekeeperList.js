"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const LingerieGirlsContract_1 = __importDefault(require("../../contracts/LingerieGirlsContract"));
const SushiGirlsContract_1 = __importDefault(require("../../contracts/SushiGirlsContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const AnyHousekeeper_1 = __importDefault(require("./AnyHousekeeper"));
class AnyHousekeeperList extends skynode_1.DomNode {
    constructor(selectable = false) {
        super(".any-housekeeper-list");
        this.selectable = selectable;
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"));
        this.loadHousekeepers();
    }
    async loadHousekeepers() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            this.loadLingerieGirls(owner);
            this.loadSushiGirls(owner);
        }
    }
    async loadLingerieGirls(owner) {
        const count = await LingerieGirlsContract_1.default.balanceOf(owner);
        skyutil_1.default.repeat(count.toNumber(), async (index) => {
            const id = (await LingerieGirlsContract_1.default.getTokenOfOwnerByIndex(owner, index)).toNumber();
            const housekeeper = new AnyHousekeeper_1.default("LingerieGirl", id, this.selectable).appendTo(this.content);
            housekeeper.on("select", () => {
                if (housekeeper === this.selectedHousekeeper) {
                    this.deselectHousekeeper();
                    this.fireEvent("deselect");
                }
                else {
                    this.selectedHousekeeper?.deselect();
                    this.selectedHousekeeper = housekeeper;
                    this.fireEvent("select", "LingerieGirl", id);
                }
            });
        });
    }
    async loadSushiGirls(owner) {
        const count = await SushiGirlsContract_1.default.balanceOf(owner);
        skyutil_1.default.repeat(count.toNumber(), async (index) => {
            const id = (await SushiGirlsContract_1.default.getTokenOfOwnerByIndex(owner, index)).toNumber();
            const housekeeper = new AnyHousekeeper_1.default("SushiGirl", id, this.selectable).appendTo(this.content);
            housekeeper.on("select", () => {
                if (housekeeper === this.selectedHousekeeper) {
                    this.deselectHousekeeper();
                    this.fireEvent("deselect");
                }
                else {
                    this.selectedHousekeeper?.deselect();
                    this.selectedHousekeeper = housekeeper;
                    this.fireEvent("select", "SushiGirl", id);
                }
            });
        });
    }
    deselectHousekeeper() {
        this.selectedHousekeeper?.deselect();
        this.selectedHousekeeper = undefined;
    }
}
exports.default = AnyHousekeeperList;
//# sourceMappingURL=AnyHousekeeperList.js.map