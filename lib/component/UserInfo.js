"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const Calculator_1 = __importDefault(require("../Calculator"));
const CommonUtil_1 = __importDefault(require("../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../contracts/CloneNursesContract"));
const LPTokenContract_1 = __importDefault(require("../contracts/LPTokenContract"));
const MaidCoinContract_1 = __importDefault(require("../contracts/MaidCoinContract"));
const TheMasterContract_1 = __importDefault(require("../contracts/TheMasterContract"));
const NetworkProvider_1 = __importDefault(require("../ethereum/NetworkProvider"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const EarnFromFarmPopup_1 = __importDefault(require("./earn-from-farm-popup/EarnFromFarmPopup"));
const EarnFromNursePopup_1 = __importDefault(require("./earn-from-nurse-popup/EarnFromNursePopup"));
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
        this.depositHandler = async (userId, pid, amount, event) => {
            const address = await Wallet_1.default.loadAddress();
            if (userId.eq(ethers_1.BigNumber.from(address)) && pid.eq(1) && amount.eq(0)) {
                const result = await NetworkProvider_1.default.provider.getTransactionReceipt(event.transactionHash);
                for (const log of result.logs) {
                    if (log.address === MaidCoinContract_1.default.address) {
                        const parsed = MaidCoinContract_1.default.interface.parseLog(log);
                        if (parsed.name === "Transfer" && parsed.args[0] === TheMasterContract_1.default.address && parsed.args[1] === address) {
                            const apr = await Calculator_1.default.poolAPR(pid.toNumber());
                            if (this.popup === undefined) {
                                this.popup = new EarnFromFarmPopup_1.default(event.transactionHash, parsed.args[2], apr);
                                this.popup.on("delete", () => this.popup = undefined);
                            }
                            break;
                        }
                    }
                }
            }
        };
        this.supportHandler = async (supporter, pid, amount, event) => {
            const address = await Wallet_1.default.loadAddress();
            if (supporter === address && pid.eq(3) && amount.eq(0)) {
                const result = await NetworkProvider_1.default.provider.getTransactionReceipt(event.transactionHash);
                for (const log of result.logs) {
                    if (log.address === MaidCoinContract_1.default.address) {
                        const parsed = MaidCoinContract_1.default.interface.parseLog(log);
                        if (parsed.name === "Transfer" && parsed.args[0] === TheMasterContract_1.default.address && parsed.args[1] === address) {
                            const apr = await Calculator_1.default.poolAPR(pid.toNumber());
                            if (this.popup === undefined) {
                                this.popup = new EarnFromFarmPopup_1.default(event.transactionHash, parsed.args[2], apr);
                                this.popup.on("delete", () => this.popup = undefined);
                            }
                            break;
                        }
                    }
                }
            }
        };
        this.claimHandler = async (nurseId, claimer, reward, event) => {
            const address = await Wallet_1.default.loadAddress();
            if (claimer === address) {
                const nurse = await CloneNursesContract_1.default.getNurse(nurseId);
                const apr = await Calculator_1.default.nurseAPR(nurse.nurseType);
                if (this.popup === undefined) {
                    this.popup = new EarnFromNursePopup_1.default(event.transactionHash, reward, apr);
                    this.popup.on("delete", () => this.popup = undefined);
                }
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
        TheMasterContract_1.default.on("Deposit", this.depositHandler);
        TheMasterContract_1.default.on("Support", this.supportHandler);
        CloneNursesContract_1.default.on("Claim", this.claimHandler);
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
            this.maidCoinPanel.empty().append(skynode_1.el(".balance", skynode_1.el("img.icon", { src: "/images/lptoken.png", height: "20.5" }), skynode_1.el(".amount", CommonUtil_1.default.displayPrice(lpBalance)), skynode_1.el("a.add-button", skynode_1.el("img", { src: "/images/component/user-info/add-button.png", height: "19" }), { href: "https://app.sushi.com/add/ETH/0x4Af698B479D0098229DC715655c667Ceb6cd8433", target: "_blank" })), skynode_1.el(".balance", skynode_1.el("img.icon", { src: "/images/maidcoin.png", height: "20.5" }), skynode_1.el(".amount", CommonUtil_1.default.displayPrice(maidBalance)), skynode_1.el("a.add-button", skynode_1.el("img", { src: "/images/component/user-info/add-button.png", height: "19" }), { href: "https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0x4Af698B479D0098229DC715655c667Ceb6cd8433", target: "_blank" })));
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        LPTokenContract_1.default.off("Transfer", this.transferHandler);
        MaidCoinContract_1.default.off("Transfer", this.transferHandler);
        TheMasterContract_1.default.off("Deposit", this.depositHandler);
        TheMasterContract_1.default.off("Support", this.supportHandler);
        CloneNursesContract_1.default.off("Claim", this.claimHandler);
        super.delete();
    }
}
exports.default = UserInfo;
//# sourceMappingURL=UserInfo.js.map