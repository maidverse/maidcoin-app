"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const StakeTab_1 = __importDefault(require("../component/maid-cafe/StakeTab"));
const UnstakeTab_1 = __importDefault(require("../component/maid-cafe/UnstakeTab"));
const MaidCafeContract_1 = __importDefault(require("../contracts/MaidCafeContract"));
const MaidCoinContract_1 = __importDefault(require("../contracts/MaidCoinContract"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class MaidCafe {
    constructor() {
        this.connectHandler = () => {
            this.loadBalances();
        };
        this.transferHandler = async (from, to, amount) => {
            const address = await Wallet_1.default.loadAddress();
            if (from === address || to === address) {
                this.loadBalances();
            }
        };
        Layout_1.default.current.changeBackground("/images/view/maid-cafe/background.jpg", "top");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".maid-cafe-view", skynode_1.el("header", skynode_1.el("h2", "Maid Cafe"), skynode_1.el("p", "Maximize yield by staking $MAID for $OMU")), this.main = skynode_1.el("main", skynode_1.el(".button-container", this.stakeButton = skynode_1.el("a.stake-button.on", "Stake $MAID", {
            click: () => {
                this.currentTab.delete();
                this.currentTab = new StakeTab_1.default().appendTo(this.main);
                this.stakeButton.addClass("on");
                this.unstakeButton.deleteClass("on");
            },
        }), this.unstakeButton = skynode_1.el("a.unstake-button", "Unstake", {
            click: () => {
                this.currentTab.delete();
                this.currentTab = new UnstakeTab_1.default().appendTo(this.main);
                this.stakeButton.deleteClass("on");
                this.unstakeButton.addClass("on");
            },
        })), skynode_1.el(".info", skynode_1.el(".apr", "APR: ", this.apr = skynode_1.el("span")), skynode_1.el(".price", "1 $OMU = ", this.price = skynode_1.el("span"), " $MAID")), this.currentTab = new StakeTab_1.default()), skynode_1.el("footer", skynode_1.el("img.npc", { src: "/images/view/maid-cafe/npc.png", height: "809" }), skynode_1.el(".balance-container", this.omuBalance = skynode_1.el(".balance"), this.maidcoinBalance = skynode_1.el(".balance")))));
        this.loadAPR();
        this.loadBalances();
        Wallet_1.default.on("connect", this.connectHandler);
        MaidCoinContract_1.default.on("Transfer", this.transferHandler);
        MaidCafeContract_1.default.on("Transfer", this.transferHandler);
    }
    async loadAPR() {
        const omu = await MaidCafeContract_1.default.getTotalSupply();
        const maidcoin = await MaidCoinContract_1.default.balanceOf(MaidCafeContract_1.default.address);
        this.apr.empty().appendText("0%");
        this.price.empty().appendText(ethers_1.utils.formatEther(maidcoin.mul(ethers_1.BigNumber.from("1000000000000000000")).div(omu)));
    }
    async loadBalances() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const lpBalance = await MaidCafeContract_1.default.balanceOf(owner);
            const maidBalance = await MaidCoinContract_1.default.balanceOf(owner);
            this.omuBalance.empty().append(skynode_1.el("img", { src: "/images/view/maid-cafe/omu.png", height: "40" }), skynode_1.el(".amount", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(lpBalance)), skynode_1.el("span", "$OMU")));
            this.maidcoinBalance.empty().append(skynode_1.el("img", { src: "/images/view/maid-cafe/maidcoin.png", height: "41.5" }), skynode_1.el(".amount", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(maidBalance)), skynode_1.el("span", "$MAID")));
        }
    }
    changeParams(params, uri) { }
    close() {
        Wallet_1.default.off("connect", this.connectHandler);
        MaidCoinContract_1.default.off("Transfer", this.transferHandler);
        MaidCafeContract_1.default.off("Transfer", this.transferHandler);
        this.container.delete();
    }
}
exports.default = MaidCafe;
//# sourceMappingURL=MaidCafe.js.map