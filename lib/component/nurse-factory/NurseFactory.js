"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const CommonUtil_1 = __importDefault(require("../../CommonUtil"));
const CloneNursesContract_1 = __importDefault(require("../../contracts/CloneNursesContract"));
const NursePartContract_1 = __importDefault(require("../../contracts/NursePartContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const Alert_1 = __importDefault(require("../dialogue/Alert"));
const GetNurseNoti_1 = __importDefault(require("../noti/GetNurseNoti"));
const CreateNursePopup_1 = __importDefault(require("./CreateNursePopup"));
class NurseFactory extends skynode_1.DomNode {
    constructor(nurseType) {
        super(".nurse-factory");
        this.nurseType = nurseType;
        this.connectHandler = () => {
            this.load();
        };
        this.transferPartHandler = async (operator, from, to, id, amount) => {
            if (from === await Wallet_1.default.loadAddress() && id.eq(this.nurseType)) {
                this.load();
            }
        };
        this.transferNurseHandler = async (from, to, id) => {
            if (from === ethers_1.constants.AddressZero && to === await Wallet_1.default.loadAddress()) {
                const nurse = await CloneNursesContract_1.default.getNurse(id);
                new GetNurseNoti_1.default(nurse.nurseType);
            }
        };
        this.append(skynode_1.el(".background"), this.content = skynode_1.el(".content"), this.footer = skynode_1.el("footer"));
        this.load();
        Wallet_1.default.on("connect", this.connectHandler);
        NursePartContract_1.default.on("TransferSingle", this.transferPartHandler);
        CloneNursesContract_1.default.on("Transfer", this.transferNurseHandler);
    }
    async load() {
        const owner = await Wallet_1.default.loadAddress();
        const nurseType = StaticDataManager_1.default.getNurseType(this.nurseType);
        const balance = owner === undefined ? undefined : await NursePartContract_1.default.balanceOf(owner, this.nurseType);
        this.content.empty().append(skynode_1.el(".name", nurseType.name), skynode_1.el(".image", {
            style: {
                backgroundImage: `url(https://storage.googleapis.com/maidcoin/Nurse/Illust/${nurseType.name}.png)`,
                width: nurseType.width,
                backgroundPosition: `${nurseType.left}px calc(50% + ${nurseType.top + 56}px)`,
            },
        }), skynode_1.el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType.name}.png`, height: "60" }), balance === undefined ? undefined : skynode_1.el(".part-count", skynode_1.el("span.balance", balance.toString()), ` / ${nurseType.partCount}`));
        this.footer.empty().append(skynode_1.el(".destroy-return", "Destroy Return: ", skynode_1.el("span", CommonUtil_1.default.numberWithCommas(ethers_1.utils.formatEther(nurseType.destroyReturn))), " $MAID"), balance === undefined ? undefined : skynode_1.el("a.create-button", "Create", {
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
        NursePartContract_1.default.off("TransferSingle", this.transferPartHandler);
        CloneNursesContract_1.default.off("Transfer", this.transferNurseHandler);
        super.delete();
    }
}
exports.default = NurseFactory;
//# sourceMappingURL=NurseFactory.js.map