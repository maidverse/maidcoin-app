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
const NursePoolList_1 = __importDefault(require("../component/nurse-pool/NursePoolList"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class Dashboard {
    constructor() {
        this.store = new skystore_1.default("Dashboard");
        this.connectHandler = () => {
            this.load();
        };
        Layout_1.default.current.changeBackground("/images/view/dashboard/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".dashboard-view", skynode_1.el("header", skynode_1.el("h2", "Dashboard"), skynode_1.el("p", "Manage your NFTs.")), this.welcomeContainer = skynode_1.el(".welcome-container"), skynode_1.el("section", skynode_1.el("h3", "Maid"), new OwnedMaidList_1.default()), skynode_1.el("section", skynode_1.el("h3", "Housekeeper"), new AnyHousekeeperList_1.default()), skynode_1.el("section", skynode_1.el("h3", "Clone Nurse"), new NursePoolList_1.default()), skynode_1.el("section", skynode_1.el("h3", "Nurse Part"), new NursePartList_1.default())));
        Wallet_1.default.on("connect", this.connectHandler);
        this.load();
    }
    async load() {
        const connected = await Wallet_1.default.connected();
        if (this.welcomeContainer.deleted !== true && this.store.get("close-welcome") !== true) {
            this.welcomeContainer.empty().append(skynode_1.el(".welcome", skynode_1.el("img", { src: "/images/view/dashboard/welcome.png", height: "142.5" }), skynode_1.el("a.close-welcome-button", skynode_1.el("img", { src: "/images/view/dashboard/close-welcome-button.png", height: "11.25" }), {
                click: () => {
                    this.store.set("close-welcome", true);
                    this.welcomeContainer.empty();
                },
            }), skynode_1.el(".info", skynode_1.el("p", "Welcome to MaidCoin"), skynode_1.el("a.document-button", "Read Documnet", { href: "https://medium.com/maid-coin", target: "_blank" }), connected === true ? undefined : skynode_1.el("a.connect-wallet-button", "Connect Wallet", {
                click: () => Wallet_1.default.connect(),
            }))));
        }
    }
    changeParams(params, uri) { }
    close() {
        Wallet_1.default.off("connect", this.connectHandler);
        this.container.delete();
    }
}
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map