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
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const NurseDetail_1 = __importDefault(require("./NurseDetail"));
class Nurse extends skynode_1.DomNode {
    constructor(nurseId) {
        super(".nurse");
        this.nurseId = nurseId;
        this.claimHandler = async (id) => {
            if (id.eq(this.nurseId) === true) {
                this.pendingReward?.empty().appendText("0");
            }
        };
        this.transferHandler = async (from, to, id) => {
            if (to === ethers_1.constants.AddressZero && id.eq(this.nurseId) === true) {
                this.delete();
            }
        };
        this.load();
        this.onDom("click", () => new NurseDetail_1.default(nurseId));
        CloneNursesContract_1.default.on("Claim", this.claimHandler);
        CloneNursesContract_1.default.on("Transfer", this.transferHandler);
    }
    async load() {
        this.currentBlockNumber = await NetworkProvider_1.default.getBlockNumber();
        const nurse = await CloneNursesContract_1.default.getNurse(this.nurseId);
        this.endBlock = nurse.endBlock;
        const nurseType = StaticDataManager_1.default.getNurseType(nurse.nurseType);
        const result = await superagent_1.default.get(`https://api.maidcoin.org/nursetypes/${nurse.nurseType}`);
        const tokenInfo = result.body;
        const image = skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${tokenInfo.name}Idle.png`, height: "70" }).appendTo(this);
        if (skyutil_1.default.random(0, 1) === 0) {
            image.style({ transform: "scaleX(-1)" });
        }
        const pendingReward = await CloneNursesContract_1.default.getPendigReward(this.nurseId);
        let lifetimePercent = (this.endBlock - this.currentBlockNumber) /
            Calculator_1.default.nurseLifetime(nurse.nurseType, nurseType.partCount, true) * 100;
        if (lifetimePercent < 0) {
            lifetimePercent = 0;
        }
        if (lifetimePercent > 100) {
            lifetimePercent = 100;
        }
        this.append(skynode_1.el("a.claim-button", skynode_1.el("img.coin-image", { src: "/images/component/nurse-pool/maidcoin.png", height: "29" }), this.pendingReward = skynode_1.el(".amount", CommonUtil_1.default.displayPrice(pendingReward)), {
            click: async (event) => {
                event.stopPropagation();
                await CloneNursesContract_1.default.claim([this.nurseId]);
            },
        }), skynode_1.el(`.battery${lifetimePercent <= 0 ? ".low" : ""}`, lifetimePercent <= 0 ? skynode_1.el("img", { src: "/images/component/nurse-pool/low-battery.png", height: "14.5" }) : skynode_1.el(".bar", {
            style: { width: `${lifetimePercent}%` },
        })));
    }
    delete() {
        CloneNursesContract_1.default.off("Claim", this.claimHandler);
        CloneNursesContract_1.default.off("Transfer", this.transferHandler);
        super.delete();
    }
}
exports.default = Nurse;
//# sourceMappingURL=Nurse.js.map