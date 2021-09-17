"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const skyutil_1 = __importDefault(require("skyutil"));
const superagent_1 = __importDefault(require("superagent"));
const Calculator_1 = __importDefault(require("../../Calculator"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const NetworkProvider_1 = __importDefault(require("../../ethereum/NetworkProvider"));
const NurseDetail_1 = __importDefault(require("./NurseDetail"));
class Nurse extends skynode_1.DomNode {
    constructor(nurseId) {
        super(".nurse");
        this.nurseId = nurseId;
        this.load();
        this.onDom("click", () => new NurseDetail_1.default(nurseId));
    }
    async load() {
        this.currentBlockNumber = await NetworkProvider_1.default.getBlockNumber();
        const nurse = await CloneNursesContract_1.default.getNurse(this.nurseId);
        this.endBlock = nurse.endBlock;
        const nurseType = await CloneNursesContract_1.default.getNurseType(nurse.nurseType);
        const result = await superagent_1.default.get(`https://api.maidcoin.org/nursetypes/${nurse.nurseType}`);
        const tokenInfo = result.body;
        const image = skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${tokenInfo.name}Idle.png`, height: "70" }).appendTo(this);
        if (skyutil_1.default.random(0, 1) === 0) {
            image.style({ transform: "scaleX(-1)" });
        }
        const pendingReward = await CloneNursesContract_1.default.getPendigReward(this.nurseId);
        const lifetimePercent = (this.endBlock - this.currentBlockNumber) /
            Calculator_1.default.nurseLifetime(nurseType.lifetime, nurseType.partCount, nurseType.partCount, true) * 100;
        this.append(skynode_1.el("a.claim-button", skynode_1.el("img.coin-image", { src: "/images/component/nurse-pool/maidcoin.png", height: "29" }), skynode_1.el(".amount", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(pendingReward))), {
            click: async (event) => {
                event.stopPropagation();
                await CloneNursesContract_1.default.claim([this.nurseId]);
            },
        }), skynode_1.el(`.battery${lifetimePercent <= 0 ? ".low" : ""}`, lifetimePercent <= 0 ? skynode_1.el("img", { src: "/images/component/nurse-pool/low-battery.png", height: "14.5" }) : skynode_1.el(".bar", {
            style: { width: `${lifetimePercent < 0 ? 0 : lifetimePercent}%` },
        })));
    }
}
exports.default = Nurse;
//# sourceMappingURL=Nurse.js.map