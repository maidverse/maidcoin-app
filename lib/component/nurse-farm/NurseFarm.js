"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Calculator_1 = __importDefault(require("../../Calculator"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const LPTokenContract_1 = __importDefault(require("../../contracts/LPTokenContract"));
const TheMasterContract_1 = __importDefault(require("../../contracts/TheMasterContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const TokenPrompt_1 = __importDefault(require("../dialogue/TokenPrompt"));
const SelectNursePopup_1 = __importDefault(require("../select-nurse-popup/SelectNursePopup"));
class NurseFarm extends skynode_1.DomNode {
    constructor() {
        super(".nurse-farm");
        this.connectHandler = () => {
            this.load();
        };
        this.supportHandler = (userId, pid, amount) => {
            if (pid.toNumber() === 3) {
                this.load();
            }
        };
        this.desupportHandler = (userId, pid, amount) => {
            if (pid.toNumber() === 3) {
                this.load();
            }
        };
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"), this.footer = skynode_1.el("footer"));
        this.load();
        Wallet_1.default.on("connect", this.connectHandler);
        TheMasterContract_1.default.on("Support", this.supportHandler);
        TheMasterContract_1.default.on("Desupport", this.desupportHandler);
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const supportingAmount = await TheMasterContract_1.default.getSupportingAmount(owner);
            const totalLPAmount = await TheMasterContract_1.default.getPoolLPAmount(3);
            if (supportingAmount.eq(0) === true) {
                this.addClass("empty");
                this.content.empty().append(skynode_1.el(".name", "Clone Nurse"), skynode_1.el(".total-lp-amount", "Total Deposited LP: ", skynode_1.el("span", CommonUtil_1.default.displayPrice(totalLPAmount))), skynode_1.el("a.add-button", skynode_1.el("img", { src: "/images/component/nurse-farm/add-button.png", height: "132.5" }), {
                    click: () => new SelectNursePopup_1.default(),
                }));
                const apr = await Calculator_1.default.poolAPR(3);
                this.footer.empty().append(skynode_1.el(".property.apr", "Expected APR: ", skynode_1.el("span", `${CommonUtil_1.default.numberWithCommas(apr.toString())}%`)));
            }
            else {
                this.deleteClass("empty");
                const { supportingTo } = await CloneNursesContract_1.default.findSupportingTo(owner);
                const nurse = await CloneNursesContract_1.default.getNurse(supportingTo);
                const nurseOwner = await CloneNursesContract_1.default.ownerOf(supportingTo);
                const nurseType = StaticDataManager_1.default.getNurseType(nurse.nurseType);
                const lpAmount = await TheMasterContract_1.default.getUserLPAmount(3, owner);
                const reward = await TheMasterContract_1.default.getPendingReward(3, owner);
                this.content.empty().append(skynode_1.el(".name", nurseType.name), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(nurseOwner)}`), skynode_1.el(".image", {
                    style: {
                        backgroundImage: `url(https://storage.googleapis.com/maidcoin/Nurse/Illust/${nurseType.name}.png)`,
                        width: nurseType.width,
                        backgroundPosition: `${nurseType.left}px calc(50% + ${nurseType.top + 56}px)`,
                    },
                }), skynode_1.el(".total-lp-amount", "Total Deposited LP: ", skynode_1.el("span", CommonUtil_1.default.displayPrice(totalLPAmount))), skynode_1.el("a.claim-button", skynode_1.el("img.maidcoin", { src: "/images/component/maid-corp/maidcoin.png", height: "29" }), skynode_1.el("span.reward", CommonUtil_1.default.displayPrice(reward)), skynode_1.el("a.claim-button", "Claim"), {
                    click: async (event) => {
                        event.stopPropagation();
                        await TheMasterContract_1.default.support(3, 0, supportingTo);
                    },
                }), skynode_1.el("a.desupport-button", "Desupport", {
                    click: async () => {
                        new TokenPrompt_1.default("Desupport Nurse", "How much amount to desupport?", "Desupport", 0, lpAmount, async (amount) => {
                            await TheMasterContract_1.default.desupport(3, amount);
                        });
                    },
                }), skynode_1.el("a.support-button", "Support", {
                    click: async () => {
                        const lpBalance = await LPTokenContract_1.default.balanceOf(owner);
                        new TokenPrompt_1.default("Support Nurse", "How much amount to support?", "Support", 0, lpBalance, async (amount) => {
                            await TheMasterContract_1.default.support(3, amount, supportingTo);
                        });
                    },
                }));
                const apr = await Calculator_1.default.poolAPR(3);
                this.footer.empty().append(skynode_1.el(".property.lp-amount", "LP Supported By Me: ", skynode_1.el("span", CommonUtil_1.default.displayPrice(lpAmount))), skynode_1.el(".property.apr", "Expected APR: ", skynode_1.el("span", `${CommonUtil_1.default.numberWithCommas(apr.toString())}%`)));
            }
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        TheMasterContract_1.default.off("Support", this.supportHandler);
        TheMasterContract_1.default.off("Desupport", this.desupportHandler);
        super.delete();
    }
}
exports.default = NurseFarm;
//# sourceMappingURL=NurseFarm.js.map