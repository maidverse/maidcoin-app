"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const LPTokenContract_1 = __importDefault(require("../../contracts/LPTokenContract"));
const MaidsContract_1 = __importDefault(require("../../contracts/MaidsContract"));
const NurseRaidContract_1 = __importDefault(require("../../contracts/NurseRaidContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const TokenPrompt_1 = __importDefault(require("../dialogue/TokenPrompt"));
const Sound_1 = __importDefault(require("./Sound"));
class MaidDetail extends skynode_1.Popup {
    constructor(maidId) {
        super(".maid-detail");
        this.maidId = maidId;
        this.scrollHandler = () => {
            const level = (this.domElement.scrollTop / (this.domElement.scrollHeight - this.rect.height)) / 2;
            this.image1?.style({ filter: `brightness(${1 - level})`, zIndex: level < 0.25 ? 1 : 0 });
            this.image2?.style({ filter: `brightness(${0.5 + level})`, zIndex: level < 0.25 ? 0 : 1 });
        };
        this.supportHandler = async (id) => {
            if (id.eq(this.maidId) === true) {
                const maid = StaticDataManager_1.default.getMaid(this.maidId);
                const supportedLP = await MaidsContract_1.default.getSupportedLP(this.maidId);
                const maidPower = await NurseRaidContract_1.default.powerOfMaids(MaidsContract_1.default.address, this.maidId);
                this.additionalPower?.empty().appendText(String(maidPower - maid.originPower));
                this.supportedLP?.empty().appendText(CommonUtil_1.default.displayPrice(supportedLP));
            }
        };
        this.desupportHandler = async (id) => {
            if (id.eq(this.maidId) === true) {
                const maid = StaticDataManager_1.default.getMaid(this.maidId);
                const supportedLP = await MaidsContract_1.default.getSupportedLP(this.maidId);
                const maidPower = await NurseRaidContract_1.default.powerOfMaids(MaidsContract_1.default.address, this.maidId);
                this.additionalPower?.empty().appendText(String(maidPower - maid.originPower));
                this.supportedLP?.empty().appendText(CommonUtil_1.default.displayPrice(supportedLP));
            }
        };
        this.append(skynode_1.el(".back-button-container", skynode_1.el("a.back-button", skynode_1.el("img", { src: "/images/component/maid-detail/back-button.png", height: "19.5" }), {
            click: () => this.delete(),
        })), this.content = skynode_1.el(".content"));
        this.load();
        this.onDom("scroll", this.scrollHandler);
        MaidsContract_1.default.on("Support", this.supportHandler);
        MaidsContract_1.default.on("Desupport", this.desupportHandler);
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }
    async load() {
        const maid = StaticDataManager_1.default.getMaid(this.maidId);
        const supportedLP = await MaidsContract_1.default.getSupportedLP(this.maidId);
        const maidOwner = await MaidsContract_1.default.ownerOf(this.maidId);
        const maidPower = await NurseRaidContract_1.default.powerOfMaids(MaidsContract_1.default.address, this.maidId);
        this.content.empty().append(this.image1 = skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Maid/Dialogue/${maid.name}Dialogue.png` }), this.image2 = skynode_1.el("img.image2", { src: `https://storage.googleapis.com/maidcoin/Maid/Ultimate/${maid.name}Ultimate.png` }), skynode_1.el("header", skynode_1.el(".name", maid.name), skynode_1.el(".cv", `CV. ${maid.character_voice}`)), skynode_1.el(".owner", `Owner: ${CommonUtil_1.default.shortenAddress(maidOwner)}`), skynode_1.el("a.speak-button", skynode_1.el("img", { src: "/images/component/maid-detail/speak-button.png", height: "28.5" }), {
            click: (event) => {
                event.stopPropagation();
                new Sound_1.default({
                    wav: `https://storage.googleapis.com/maidcoin/Maid/Voice/${maid.name}/${maid.name}LobbyTap${this.getRandomInt(1, 2)}.wav`,
                }).play();
            },
        }), skynode_1.el(".properties", skynode_1.el(".power", skynode_1.el("img", { src: "/images/component/power-icon.png", height: "23" }), skynode_1.el("span", String(maidPower))), skynode_1.el(".property.origin-power", "Origin Power: ", skynode_1.el("span", String(maid.originPower))), skynode_1.el(".property.additional-power", "Additional Power: ", this.additionalPower = skynode_1.el("span", String(maidPower - maid.originPower))), skynode_1.el(".property.lp-amount", "LP Supported: ", this.supportedLP = skynode_1.el("span", CommonUtil_1.default.displayPrice(supportedLP)))), skynode_1.el(".controller", skynode_1.el("a.power-up-button", "Power Up", {
            click: async (event) => {
                event.stopPropagation();
                const owner = await Wallet_1.default.loadAddress();
                if (owner !== undefined) {
                    const lpBalance = await LPTokenContract_1.default.balanceOf(owner);
                    new TokenPrompt_1.default("Support Maid", "How much amount to support?", "Support", 0, lpBalance, async (amount) => {
                        await MaidsContract_1.default.support(this.maidId, amount);
                    });
                }
            },
        }), skynode_1.el("a.power-down-button", "Power Down", {
            click: async (event) => {
                event.stopPropagation();
                const supported = await MaidsContract_1.default.getSupportedLP(this.maidId);
                new TokenPrompt_1.default("Desupport Maid", "How much amount to desupport?", "Desupport", 0, supported, async (amount) => {
                    await MaidsContract_1.default.desupport(this.maidId, amount);
                });
            },
        })), skynode_1.el("a.tweet-button", "Share", { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`MaidCoin Maid - ${maid.name}\nhttps://app.maidcoin.org/maids/${this.maidId}`)}`, target: "_blank" }));
        this.scrollHandler();
    }
    delete() {
        MaidsContract_1.default.off("Support", this.supportHandler);
        MaidsContract_1.default.off("Desupport", this.desupportHandler);
        super.delete();
    }
}
exports.default = MaidDetail;
//# sourceMappingURL=MaidDetail.js.map