"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const skyutil_1 = __importDefault(require("skyutil"));
const superagent_1 = __importDefault(require("superagent"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const NurseDetail_1 = __importDefault(require("./NurseDetail"));
class Nurse extends skynode_1.DomNode {
    constructor(nurseId) {
        super(".nurse");
        this.nurseId = nurseId;
        this.load();
        this.onDom("click", () => new NurseDetail_1.default(nurseId));
    }
    async load() {
        const { nurseType } = await CloneNursesContract_1.default.getNurse(this.nurseId);
        const result = await superagent_1.default.post(`https://api.maidcoin.org/nursetypes/${nurseType}`);
        const tokenInfo = result.body;
        const image = skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${tokenInfo.name}Idle.png`, height: "70" }).appendTo(this);
        if (skyutil_1.default.random(0, 1) === 0) {
            image.style({ transform: "scaleX(-1)" });
        }
        const pendingReward = await CloneNursesContract_1.default.getPendigReward(this.nurseId);
        this.append(skynode_1.el("a.claim-button", skynode_1.el("img.coin-image", { src: "/images/maidcoin-claim.png" }), skynode_1.el(".amount", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(pendingReward)))));
    }
}
exports.default = Nurse;
//# sourceMappingURL=Nurse.js.map