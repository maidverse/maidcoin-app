"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const MaidCoinContract_1 = __importDefault(require("../../contracts/MaidCoinContract"));
const NurseRaidContract_1 = __importDefault(require("../../contracts/NurseRaidContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const MaidsContractSelector_1 = __importDefault(require("../../MaidsContractSelector"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const Alert_1 = __importDefault(require("../dialogue/Alert"));
const AnyHousekeeperList_1 = __importDefault(require("../housekeeper/AnyHousekeeperList"));
const MaidList_1 = __importDefault(require("./MaidList"));
class SelectMaidPopup extends skynode_1.Popup {
    constructor(raidId) {
        super(".popup-background");
        this.raidId = raidId;
        let maidList;
        let housekeeperList;
        this.append(this.content = skynode_1.el(".select-maid-popup", skynode_1.el("h1", "Select Supporter"), skynode_1.el("a.close-button", skynode_1.el("img", { src: "/images/component/select-maid-popup/close-button.png", height: "25" }), {
            click: () => this.delete(),
        }), skynode_1.el("main", skynode_1.el("section", skynode_1.el("h2", "Maid"), maidList = new MaidList_1.default()), skynode_1.el("section", skynode_1.el("h2", "Housekeeper"), housekeeperList = new AnyHousekeeperList_1.default(true))), this.footer = skynode_1.el("footer")));
        maidList.on("select", (id) => {
            this.selectedSupporter = { type: "Maid", id };
            housekeeperList.deselectHousekeeper();
        });
        housekeeperList.on("select", (type, id) => {
            this.selectedSupporter = { type, id };
            maidList.deselectMaid();
        });
        maidList.on("deselect", () => this.selectedSupporter = undefined);
        housekeeperList.on("deselect", () => this.selectedSupporter = undefined);
        this.load();
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const raid = StaticDataManager_1.default.getRaid(this.raidId);
            this.footer.empty().append(skynode_1.el("a.start-button", CommonUtil_1.default.displayPrice(raid.entranceFee), skynode_1.el("img.icon", { src: "/images/maidcoin.png", height: "20.5" }), "Start", {
                click: async () => {
                    const balance = await MaidCoinContract_1.default.balanceOf(owner);
                    if (balance.lt(raid.entranceFee)) {
                        new Alert_1.default("Error", "Not enough $MAID.", "Confirm");
                    }
                    else {
                        let maidsAddress;
                        const maidsType = this.selectedSupporter?.type;
                        if (maidsType !== undefined) {
                            maidsAddress = MaidsContractSelector_1.default.typeToAddress(maidsType);
                        }
                        await NurseRaidContract_1.default.enter(this.raidId, maidsAddress, this.selectedSupporter?.id);
                        this.delete();
                    }
                },
            }));
        }
    }
}
exports.default = SelectMaidPopup;
//# sourceMappingURL=SelectMaidPopup.js.map