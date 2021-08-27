"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const CloneNurseContract_1 = __importDefault(require("../../contracts/CloneNurseContract"));
const NursePartContract_1 = __importDefault(require("../../contracts/NursePartContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
class NurseFactory extends skynode_1.DomNode {
    constructor(nurseType) {
        super(".nurse-factory");
        this.nurseType = nurseType;
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
            const nurseType = await CloneNurseContract_1.default.getNurseType(this.nurseType);
            const balance = await NursePartContract_1.default.balanceOf(owner, this.nurseType);
            const result = await superagent_1.default.post(`https://api.maidcoin.org/nursetypes/${this.nurseType}`);
            const tokenInfo = result.body;
            this.content.empty().append(skynode_1.el(".image", { style: { backgroundImage: `url(${tokenInfo.image})` } }), skynode_1.el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${this.nurseType}.png`, height: "60" }), skynode_1.el(".part-count", skynode_1.el("span.balance", balance.toString()), ` / ${nurseType.partCount}`));
            this.footer.empty().append(skynode_1.el(".name", tokenInfo.name), skynode_1.el("a.create-button", "Create", {
                click: async () => {
                    await CloneNurseContract_1.default.assemble(this.nurseType);
                },
            }));
        }
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        super.delete();
    }
}
exports.default = NurseFactory;
//# sourceMappingURL=NurseFactory.js.map