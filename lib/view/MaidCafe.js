"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const StakeTab_1 = __importDefault(require("../component/maid-cafe/StakeTab"));
const MaidCafeContract_1 = __importDefault(require("../contracts/MaidCafeContract"));
const MaidCoinContract_1 = __importDefault(require("../contracts/MaidCoinContract"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const Layout_1 = __importDefault(require("./Layout"));
class MaidCafe {
    constructor() {
        Layout_1.default.current.changeBackground("/images/view/maid-cafe/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".maid-cafe-view", skynode_1.el("header", skynode_1.el("h2", "Maid Cafe"), skynode_1.el("p", "Maximize yield by staking $MAID for $OMU")), skynode_1.el("main", skynode_1.el(".button-container", skynode_1.el("a.stake-button.on", "Stake $MAID"), skynode_1.el("a.unstake-button", "Unstake")), skynode_1.el(".info", skynode_1.el(".apr", "APR: ", this.apr = skynode_1.el("span")), skynode_1.el(".price", "1 $OMU = ", this.price = skynode_1.el("span"), " $MAID")), this.currentTab = new StakeTab_1.default()), skynode_1.el("footer", skynode_1.el("img.npc", { src: "/images/view/maid-cafe/npc.png", height: "447" }), skynode_1.el(".balance", this.omuBalance = skynode_1.el(".omu-balance"), this.maidcoinBalance = skynode_1.el(".maidcoin-balance")))));
        this.loadBalance();
    }
    async loadBalance() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const lpBalance = await MaidCafeContract_1.default.balanceOf(owner);
            const maidBalance = await MaidCoinContract_1.default.balanceOf(owner);
            this.omuBalance.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(lpBalance)));
            this.maidcoinBalance.empty().appendText(CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(maidBalance)));
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = MaidCafe;
//# sourceMappingURL=MaidCafe.js.map