"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skystore_1 = __importDefault(require("skystore"));
const AnyHousekeeperList_1 = __importDefault(require("../component/housekeeper/AnyHousekeeperList"));
const OwnedMaidList_1 = __importDefault(require("../component/maid/OwnedMaidList"));
const NursePartList_1 = __importDefault(require("../component/nurse-part/NursePartList"));
const NurseDetail_1 = __importDefault(require("../component/nurse-pool/NurseDetail"));
const NursePoolList_1 = __importDefault(require("../component/nurse-pool/NursePoolList"));
const Config_1 = __importDefault(require("../Config"));
const NetworkProvider_1 = __importDefault(require("../ethereum/NetworkProvider"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class Dashboard {
    constructor(params) {
        this.store = new skystore_1.default("Dashboard");
        this.connectHandler = () => {
            this.load();
        };
        Layout_1.default.current.changeBackground("/images/view/dashboard/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".dashboard-view", skynode_1.el("header", skynode_1.el("h2", "Dashboard"), skynode_1.el("p", "Manage your NFTs.")), this.welcomeContainer = skynode_1.el(".welcome-container"), skynode_1.el("section", skynode_1.el("h3", "Maid"), new OwnedMaidList_1.default()), skynode_1.el("section", skynode_1.el("h3", "Housekeeper"), new AnyHousekeeperList_1.default()), skynode_1.el("section", skynode_1.el("h3", "Clone Nurse"), new NursePoolList_1.default()), skynode_1.el("section", skynode_1.el("h3", "Nurse Part"), new NursePartList_1.default())));
        Wallet_1.default.on("connect", this.connectHandler);
        this.load();
        this.openNurseDetail(params.nurseId);
    }
    async load() {
        if (this.startBlockInterval !== undefined) {
            clearInterval(this.startBlockInterval);
            this.startBlockInterval = undefined;
        }
        const connected = await Wallet_1.default.connected();
        if (this.welcomeContainer.deleted !== true) {
            let startBlockTimer;
            this.welcomeContainer.empty().append(skynode_1.el(".welcome", skynode_1.el("img", { src: "/images/view/dashboard/welcome.png", height: "142.5" }), skynode_1.el(".info", skynode_1.el("p", "Welcome to MaidCoin"), skynode_1.el("a.document-button", "Read Documnet", { href: "https://shillbo.medium.com/how-to-farm-maidcoin-play-the-game-2ee832a8e91c", target: "_blank" }), startBlockTimer = skynode_1.el(".start-block-timer"), connected === true ? undefined : skynode_1.el("a.connect-wallet-button", "Connect Wallet", {
                click: () => Wallet_1.default.connect(),
            }))));
            if (this.startBlockInterval !== undefined) {
                clearInterval(this.startBlockInterval);
            }
            const refresh = async () => {
                const currentBlock = await NetworkProvider_1.default.getBlockNumber();
                if (startBlockTimer.deleted !== true) {
                    const leftBlocks = Config_1.default.startBlock - currentBlock;
                    if (leftBlocks > 0) {
                        startBlockTimer.empty().appendText(`Pool Start ${leftBlocks} ${leftBlocks === 1 ? "Block" : "Blocks"} Left`);
                    }
                }
            };
            refresh();
            this.startBlockInterval = setInterval(() => refresh(), Config_1.default.blockTimeSecond * 1000);
        }
    }
    async openNurseDetail(id) {
        if (id !== undefined) {
            new NurseDetail_1.default(parseInt(id, 10));
        }
    }
    changeParams(params, uri) {
        this.openNurseDetail(params.nurseId);
    }
    close() {
        if (this.startBlockInterval !== undefined) {
            clearInterval(this.startBlockInterval);
        }
        Wallet_1.default.off("connect", this.connectHandler);
        this.container.delete();
    }
}
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map