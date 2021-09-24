"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../../CommonUtil"));
const LPTokenContract_1 = __importDefault(require("../../../contracts/LPTokenContract"));
const NurseRaidContract_1 = __importDefault(require("../../../contracts/NurseRaidContract"));
const SushiGirlsContract_1 = __importDefault(require("../../../contracts/SushiGirlsContract"));
const Wallet_1 = __importDefault(require("../../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../../StaticDataManager"));
const TokenPrompt_1 = __importDefault(require("../../dialogue/TokenPrompt"));
class SushiGirlDetail extends skynode_1.Popup {
    constructor(id) {
        super(".sushigirl-detail");
        this.id = id;
        this.supportHandler = async (id) => {
            if (id.eq(this.id) === true) {
                const sushiGirl = StaticDataManager_1.default.getSushiGirl(this.id);
                const supportedLP = await SushiGirlsContract_1.default.getSupportedLP(this.id);
                const sushiGirlPower = await NurseRaidContract_1.default.powerOfMaids(SushiGirlsContract_1.default.address, this.id);
                this.additionalPower?.empty().appendText(String(sushiGirlPower - sushiGirl.originPower));
                this.supportedLP?.empty().appendText(ethers_1.utils.formatEther(supportedLP));
            }
        };
        this.desupportHandler = async (id) => {
            if (id.eq(this.id) === true) {
                const sushiGirl = StaticDataManager_1.default.getSushiGirl(this.id);
                const supportedLP = await SushiGirlsContract_1.default.getSupportedLP(this.id);
                const sushiGirlPower = await NurseRaidContract_1.default.powerOfMaids(SushiGirlsContract_1.default.address, this.id);
                this.additionalPower?.empty().appendText(String(sushiGirlPower - sushiGirl.originPower));
                this.supportedLP?.empty().appendText(ethers_1.utils.formatEther(supportedLP));
            }
        };
        this.append(skynode_1.el(".back-button-container", skynode_1.el("a.back-button", skynode_1.el("img", { src: "/images/component/housekeeper-detail/back-button.png", height: "19.5" }), {
            click: () => this.delete(),
        })), this.content = skynode_1.el(".content"));
        this.load();
        SushiGirlsContract_1.default.on("Support", this.supportHandler);
        SushiGirlsContract_1.default.on("Desupport", this.desupportHandler);
    }
    async load() {
        const sushiGirl = StaticDataManager_1.default.getSushiGirl(this.id);
        const supportedLP = await SushiGirlsContract_1.default.getSupportedLP(this.id);
        const sushiGirlOwner = await SushiGirlsContract_1.default.ownerOf(this.id);
        const sushiGirlPower = await NurseRaidContract_1.default.powerOfMaids(SushiGirlsContract_1.default.address, this.id);
        const result = await superagent_1.default.get(`https://api.maidcoin.org/sushigirls/${this.id}`);
        const tokenInfo = result.body;
        this.content.empty().append(skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/SushiGirl/Character/${this.id}.png` }), skynode_1.el(".name", tokenInfo.name), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(sushiGirlOwner)}`), skynode_1.el(".properties", skynode_1.el(".power", skynode_1.el("img", { src: "/images/component/power-icon.png", height: "23" }), skynode_1.el("span", String(sushiGirlPower))), skynode_1.el(".property.origin-power", "Origin Power: ", skynode_1.el("span", String(sushiGirl.originPower))), skynode_1.el(".property.additional-power", "Additional Power: ", this.additionalPower = skynode_1.el("span", String(sushiGirlPower - sushiGirl.originPower))), skynode_1.el(".property.lp-amount", "LP Supported: ", this.supportedLP = skynode_1.el("span", ethers_1.utils.formatEther(supportedLP)))), skynode_1.el(".controller", skynode_1.el("a.power-up-button", "Power Up", {
            click: async (event) => {
                event.stopPropagation();
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const lpBalance = await LPTokenContract_1.default.balanceOf(owner);
                    new TokenPrompt_1.default("Support Sushi Girl", "How much amount to support?", "Support", 0, lpBalance, async (amount) => {
                        await SushiGirlsContract_1.default.support(this.id, amount);
                    });
                }
            },
        }), skynode_1.el("a.power-down-button", "Power Down", {
            click: async (event) => {
                event.stopPropagation();
                const supported = await SushiGirlsContract_1.default.getSupportedLP(this.id);
                new TokenPrompt_1.default("Desupport Sushi Girl", "How much amount to desupport?", "Desupport", 0, supported, async (amount) => {
                    await SushiGirlsContract_1.default.desupport(this.id, amount);
                });
            },
        })));
    }
    delete() {
        SushiGirlsContract_1.default.off("Support", this.supportHandler);
        SushiGirlsContract_1.default.off("Desupport", this.desupportHandler);
        super.delete();
    }
}
exports.default = SushiGirlDetail;
//# sourceMappingURL=SushiGirlDetail.js.map