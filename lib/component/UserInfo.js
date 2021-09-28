"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const skystore_1 = __importDefault(require("skystore"));
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../contracts/CloneNursesContract"));
const LPTokenContract_1 = __importDefault(require("../contracts/LPTokenContract"));
const MaidCoinContract_1 = __importDefault(require("../contracts/MaidCoinContract"));
const TheMasterContract_1 = __importDefault(require("../contracts/TheMasterContract"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const FirstEarnPopup_1 = __importDefault(require("./first-earn-popup/FirstEarnPopup"));
class UserInfo extends skynode_1.DomNode {
    constructor() {
        super(".user-info");
        this.store = new skystore_1.default("UserInfo");
        this.connectHandler = () => {
            this.loadUserInfo();
            this.loadBalances();
        };
        this.transferHandler = async (from, to, amount) => {
            const address = await Wallet_1.default.loadAddress();
            if (from === address || to === address) {
                this.loadBalances();
            }
            if ((from === TheMasterContract_1.default.address ||
                from === CloneNursesContract_1.default.address) && to === address && this.store.get("first-earn") !== true) {
                new FirstEarnPopup_1.default(amount);
                this.store.set("first-earn", true);
            }
        };
        this.append(this.ownerPanel = skynode_1.el(".owner"), this.maidCoinPanel = skynode_1.el(".maid-coin"), this.connectButton = skynode_1.el("a.connect-button", "Connect", {
            click: () => Wallet_1.default.connect(),
        }));
        this.ownerPanel.style({ display: "none" });
        this.maidCoinPanel.style({ display: "none" });
        this.connectButton.style({ display: "none" });
        this.loadUserInfo();
        this.loadBalances();
        Wallet_1.default.on("connect", this.connectHandler);
        LPTokenContract_1.default.on("Transfer", this.transferHandler);
        MaidCoinContract_1.default.on("Transfer", this.transferHandler);
    }
    async loadUserInfo() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner === undefined) {
            this.ownerPanel.style({ display: "none" });
            this.maidCoinPanel.style({ display: "none" });
            this.connectButton.style({ display: "flex" });
        }
        else {
            this.ownerPanel.style({ display: "block" });
            this.maidCoinPanel.style({ display: "block" });
            this.connectButton.style({ display: "none" });
            this.ownerPanel.empty().append(skynode_1.el(".address", `Owner: ${CommonUtil_1.default.shortenAddress(owner)}`));
        }
    }
    async loadBalances() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const lpBalance = await LPTokenContract_1.default.balanceOf(owner);
            const maidBalance = await MaidCoinContract_1.default.balanceOf(owner);
            this.maidCoinPanel.empty().append(skynode_1.el(".balance", skynode_1.el("img.icon", { src: "/images/lptoken.png", height: "20.5" }), skynode_1.el(".amount", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(lpBalance))), skynode_1.el("a.add-button", skynode_1.el("img", { src: "/images/component/user-info/add-button.png", height: "19" }), { href: "https://app.sushi.com/add/ETH/0x4Af698B479D0098229DC715655c667Ceb6cd8433", target: "_blank" })), skynode_1.el(".balance", skynode_1.el("img.icon", { src: "/images/maidcoin.png", height: "20.5" }), skynode_1.el(".amount", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(maidBalance))), skynode_1.el("a.add-button", skynode_1.el("img", { src: "/images/component/user-info/add-button.png", height: "19" }), { href: "https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0x4Af698B479D0098229DC715655c667Ceb6cd8433", target: "_blank" })));
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        LPTokenContract_1.default.off("Transfer", this.transferHandler);
        MaidCoinContract_1.default.off("Transfer", this.transferHandler);
        super.delete();
    }
}
exports.default = UserInfo;
//# sourceMappingURL=UserInfo.js.map