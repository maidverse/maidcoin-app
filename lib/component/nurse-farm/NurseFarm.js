"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const LPTokenContract_1 = __importDefault(require("../../contracts/LPTokenContract"));
const TheMasterContract_1 = __importDefault(require("../../contracts/TheMasterContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const TokenPrompt_1 = __importDefault(require("../dialogue/TokenPrompt"));
const SelectNursePopup_1 = __importDefault(require("../select-nurse-popup/SelectNursePopup"));
class NurseFarm extends skynode_1.DomNode {
    constructor() {
        super(".nurse-farm");
        this.connectHandler = () => {
            this.load();
        };
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"), this.footer = skynode_1.el("footer"));
        this.load();
        Wallet_1.default.on("connect", this.connectHandler);
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        if (owner !== undefined) {
            const supportingAmount = await TheMasterContract_1.default.getSupportingAmount(owner);
            if (supportingAmount.eq(0) === true) {
                this.addClass("empty");
                this.content.empty().append(skynode_1.el(".name", "Clone Nurse"), skynode_1.el("a.add-button", skynode_1.el("img", { src: "/images/component/nurse-farm/add-button.png", height: "132.5" }), {
                    click: () => new SelectNursePopup_1.default(),
                }));
                this.footer.empty().append(skynode_1.el(".property.apr", "APR: ", skynode_1.el("span", "0%")));
            }
            else {
                this.deleteClass("empty");
                const supportingTo = (await CloneNursesContract_1.default.getSupportingTo(owner)).toNumber();
                const nurse = await CloneNursesContract_1.default.getNurse(supportingTo);
                const nurseOwner = await CloneNursesContract_1.default.ownerOf(supportingTo);
                const result = await superagent_1.default.get(`https://api.maidcoin.org/nursetypes/${nurse.nurseType}`);
                const tokenInfo = result.body;
                const lpAmount = await TheMasterContract_1.default.getLPAmount(3, owner);
                const reward = await TheMasterContract_1.default.getPendingReward(3, owner);
                this.content.empty().append(skynode_1.el(".name", tokenInfo.name), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(nurseOwner)}`), skynode_1.el(".image", { style: { backgroundImage: `url(https://storage.googleapis.com/maidcoin/Nurse/Illust/${tokenInfo.name}.png)` } }), skynode_1.el("a.claim-button", skynode_1.el("img.maidcoin", { src: "/images/component/maid-corp/maidcoin.png", height: "29" }), skynode_1.el("span.reward", ethers_1.utils.formatEther(reward))), skynode_1.el("a.desupport-button", "Desupport", {
                    click: async () => {
                        const lpBalance = await LPTokenContract_1.default.balanceOf(owner);
                        new TokenPrompt_1.default("Desupport Nurse", "How much amount to desupport?", "Desupport", 0, lpBalance, async (amount) => {
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
                this.footer.empty().append(skynode_1.el(".property.lp-amount", "Deposited LP: ", skynode_1.el("span", ethers_1.utils.formatEther(lpAmount))), skynode_1.el(".property.apr", "APR: ", skynode_1.el("span", "0%")));
            }
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        super.delete();
    }
}
exports.default = NurseFarm;
//# sourceMappingURL=NurseFarm.js.map