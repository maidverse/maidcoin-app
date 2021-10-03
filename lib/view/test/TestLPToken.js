"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const TestLPTokenContract_1 = __importDefault(require("../../contracts/test/TestLPTokenContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const Layout_1 = __importDefault(require("../Layout"));
class TestLPToken {
    constructor() {
        this.connectHandler = () => {
            this.loadInfo();
        };
        this.transferHandler = (from, to, amount) => {
            this.loadInfo();
        };
        Layout_1.default.current.changeBackground("/images/view/maid/background.jpg");
        Layout_1.default.current.content.append(this.container = skynode_1.el(".test-lp-token-view", skynode_1.el("h2", "Test LP Token"), this.info = skynode_1.el(".info", skynode_1.el(".loading", "Loading...")), skynode_1.el(".control", skynode_1.el("a.mint-button", "Mint", {
            click: async () => {
                const amount = prompt("How much amount to mint?", "10");
                if (amount) {
                    await TestLPTokenContract_1.default.mint(ethers_1.utils.parseEther(amount));
                }
            },
        }))));
        this.loadInfo();
        Wallet_1.default.on("connect", this.connectHandler);
        TestLPTokenContract_1.default.on("Transfer", this.transferHandler);
    }
    async loadInfo() {
        const owner = await Wallet_1.default.loadAddress();
        const totalSupply = await TestLPTokenContract_1.default.getTotalSupply();
        const balance = owner === undefined ? undefined : await TestLPTokenContract_1.default.balanceOf(owner);
        this.info.empty().append(skynode_1.el(".total-supply", `Total Supply: ${CommonUtil_1.default.displayPrice(totalSupply)}`), skynode_1.el(".balance", owner === undefined ?
            "Your Balance: Please connect to wallet." :
            `Your Balance: ${CommonUtil_1.default.displayPrice(balance)}`));
    }
    changeParams(params, uri) { }
    close() {
        Wallet_1.default.off("connect", this.connectHandler);
        TestLPTokenContract_1.default.off("Transfer", this.transferHandler);
        this.container.delete();
    }
}
exports.default = TestLPToken;
//# sourceMappingURL=TestLPToken.js.map