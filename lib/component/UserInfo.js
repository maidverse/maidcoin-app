"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const LPTokenContract_1 = __importDefault(require("../contracts/LPTokenContract"));
const MaidCoinContract_1 = __importDefault(require("../contracts/MaidCoinContract"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
class UserInfo extends skynode_1.DomNode {
    constructor() {
        super(".user-info");
        this.connectHandler = () => {
            this.loadUserInfo();
            this.loadBalances();
        };
        this.transferHandler = async (from, to, amount) => {
            const address = await Wallet_1.default.loadAddress();
            if (from === address || to === address) {
                this.loadBalances();
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
            this.maidCoinPanel.empty().append(skynode_1.el(".balance", skynode_1.el("img.icon", { src: "/images/lptoken.png", height: "20.5" }), skynode_1.el(".amount", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(lpBalance)))), skynode_1.el(".balance", skynode_1.el("img.icon", { src: "/images/maidcoin.png", height: "20.5" }), skynode_1.el(".amount", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(maidBalance)))));
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        MaidCoinContract_1.default.off("Transfer", this.transferHandler);
        super.delete();
    }
}
exports.default = UserInfo;
//# sourceMappingURL=UserInfo.js.map