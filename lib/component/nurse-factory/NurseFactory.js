"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const Calculator_1 = __importDefault(require("../../Calculator"));
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const NursePartContract_1 = __importDefault(require("../../contracts/NursePartContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const Alert_1 = __importDefault(require("../dialogue/Alert"));
const CreateNursePopup_1 = __importDefault(require("./CreateNursePopup"));
class NurseFactory extends skynode_1.DomNode {
    constructor(nurseType) {
        super(".nurse-factory");
        this.nurseType = nurseType;
        this.connectHandler = () => {
            this.load();
        };
        this.transferSingleHandler = async (operator, from, to, id, amount) => {
            if (from === await Wallet_1.default.loadAddress() && id.eq(this.nurseType)) {
                this.load();
            }
        };
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"), this.footer = skynode_1.el("footer"));
        this.load();
        Wallet_1.default.on("connect", this.connectHandler);
        NursePartContract_1.default.on("TransferSingle", this.transferSingleHandler);
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        const nurseType = StaticDataManager_1.default.getNurseType(this.nurseType);
        const balance = owner === undefined ? undefined : await NursePartContract_1.default.balanceOf(owner, this.nurseType);
        this.content.empty().append(skynode_1.el(".name", nurseType.name), skynode_1.el(".power", skynode_1.el("img", { src: "/images/component/nurse-factory/power-icon.png", height: "13.5" }), skynode_1.el("span", String(nurseType.power))), skynode_1.el(".image", {
            style: {
                backgroundImage: `url(https://storage.googleapis.com/maidcoin/Nurse/Illust/${nurseType.name}.png)`,
                width: nurseType.width,
                backgroundPosition: `${nurseType.left}px calc(50% + ${nurseType.top + 56}px)`,
            },
        }), skynode_1.el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType.name}.png`, height: "60" }), balance === undefined ? undefined : skynode_1.el(".part-count", skynode_1.el("span.balance", balance.toString()), ` / ${nurseType.partCount}`), skynode_1.el(".destroy-return", "Destroy Return: ", skynode_1.el("span", CommonUtil_1.default.displayPrice(nurseType.destroyReturn)), " $MAID"));
        const apr = this.nurseType >= 6 ? await Calculator_1.default.nurseAPR(this.nurseType) : await Calculator_1.default.nurseFullChargingAPR(this.nurseType);
        this.footer.empty().append(skynode_1.el(".apr", "APR: ", skynode_1.el("span", `${CommonUtil_1.default.numberWithCommas(apr.toString())}%`)), balance === undefined ? undefined : skynode_1.el("a.create-button", "Create", {
            click: () => {
                if (balance.toNumber() < nurseType.partCount) {
                    new Alert_1.default("Error", "Nurse Parts not enough.", "Confirm");
                }
                else {
                    new CreateNursePopup_1.default(this.nurseType);
                }
            },
        }));
    }
    delete() {
        Wallet_1.default.off("connect", this.connectHandler);
        NursePartContract_1.default.off("TransferSingle", this.transferSingleHandler);
        super.delete();
    }
}
exports.default = NurseFactory;
//# sourceMappingURL=NurseFactory.js.map