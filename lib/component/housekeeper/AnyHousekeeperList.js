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
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const AnyHousekeeper_1 = __importDefault(require("./AnyHousekeeper"));
class AnyHousekeeperList extends skynode_1.DomNode {
    constructor(selectable = false) {
        super(".any-housekeeper-list");
        this.selectable = selectable;
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content", this.zoomButton = skynode_1.el("a.zoom-button", skynode_1.el("img", { src: "/images/view/dashboard/zoom-button.png", height: "27.5" }), "View Housekeepers", { click: () => ViewUtil_1.default.go("/housekeepers") })));
        this.zoomButton.on("delete", () => this.zoomButton = undefined);
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
            if (this.deleted !== true) {
                this.zoomButton?.delete();
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
            }
        });
    }
    async loadSushiGirls(owner) {
        const count = await SushiGirlsContract_1.default.balanceOf(owner);
        skyutil_1.default.repeat(count.toNumber(), async (index) => {
            const id = (await SushiGirlsContract_1.default.getTokenOfOwnerByIndex(owner, index)).toNumber();
            if (this.deleted !== true) {
                this.zoomButton?.delete();
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
            }
        });
    }
    deselectHousekeeper() {
        this.selectedHousekeeper?.deselect();
        this.selectedHousekeeper = undefined;
    }
}
exports.default = AnyHousekeeperList;
//# sourceMappingURL=AnyHousekeeperList.js.map