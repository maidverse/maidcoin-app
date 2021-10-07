"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const NursePartContract_1 = __importDefault(require("../../contracts/NursePartContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const ViewUtil_1 = __importDefault(require("../../view/ViewUtil"));
const Loading_1 = __importDefault(require("../Loading"));
const NursePart_1 = __importDefault(require("./NursePart"));
class NursePartList extends skynode_1.DomNode {
    constructor() {
        super(".nurse-part-list");
        this.connectHandler = () => {
            if (this.loading === undefined) {
                this.loadNurseParts();
            }
        };
        this.append(this.loading = new Loading_1.default(), skynode_1.el(".background"), this.content = skynode_1.el(".content", this.plusButton = skynode_1.el("a.zoom-button", skynode_1.el("img", { src: "/images/view/dashboard/plus-button.png", height: "23.5" }), "Go to Nurse Raids", { click: () => ViewUtil_1.default.go("/nurseraids") })));
        this.plusButton.on("delete", () => this.plusButton = undefined);
        this.loadNurseParts();
        Wallet_1.default.on("connect", this.connectHandler);
    }
    async loadNurseParts() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const nurseTypes = StaticDataManager_1.default.getNurseTypes();
            for (const nurseType of nurseTypes) {
                const nursePartCount = (await NursePartContract_1.default.balanceOf(owner, nurseType)).toNumber();
                if (this.deleted !== true && nursePartCount > 0) {
                    this.plusButton?.delete();
                    this.content.append(new NursePart_1.default(nurseType, nursePartCount));
                }
            }
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
exports.default = NursePartList;
//# sourceMappingURL=NursePartList.js.map