"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const ethers_1 = require("ethers");
const MobileMenu_1 = __importDefault(require("../component/menu/MobileMenu"));
const MoreMenu_1 = __importDefault(require("../component/menu/MoreMenu"));
const PCMenu_1 = __importDefault(require("../component/menu/PCMenu"));
const GetNurseNoti_1 = __importDefault(require("../component/noti/GetNurseNoti"));
const GetPartsNoti_1 = __importDefault(require("../component/noti/GetPartsNoti"));
const UserInfo_1 = __importDefault(require("../component/UserInfo"));
const CloneNursesContract_1 = __importDefault(require("../contracts/CloneNursesContract"));
const NursePartContract_1 = __importDefault(require("../contracts/NursePartContract"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const ViewUtil_1 = __importDefault(require("./ViewUtil"));
class Layout {
    constructor() {
        this.transferNurseHandler = async (from, to, id) => {
            if (from === ethers_1.constants.AddressZero && to === await Wallet_1.default.loadAddress()) {
                const nurse = await CloneNursesContract_1.default.getNurse(id);
                new GetNurseNoti_1.default(nurse.nurseType);
            }
        };
        this.transferPartHandler = async (operator, from, to, id, amount) => {
            if (from === ethers_1.constants.AddressZero && to === await Wallet_1.default.loadAddress()) {
                new GetPartsNoti_1.default(id.toNumber(), amount.toNumber());
            }
        };
        Layout.current = this;
        skynode_1.BodyNode.append(this.container = skynode_1.el(".layout", skynode_1.el("header", skynode_1.el("a.menu-button", skynode_1.el("img", { src: "/images/view/layout/menu-button.png", height: "16" }), {
            click: (event, button) => {
                const rect = button.rect;
                new MobileMenu_1.default({ left: rect.left - 4, top: rect.top - 4 }).appendTo(skynode_1.BodyNode);
            },
        }), skynode_1.el("h1", skynode_1.el("a", skynode_1.el("img.pc-logo", { src: "/images/view/layout/pc-logo.png", height: "24" }), skynode_1.el("img.mobile-logo", { src: "/images/view/layout/mobile-logo.png", height: "28" }), { click: () => ViewUtil_1.default.go("/") })), new PCMenu_1.default(), skynode_1.el(".span"), new UserInfo_1.default(), skynode_1.el("a.more-button", skynode_1.el("img", { src: "/images/view/layout/more-button.png", height: "24" }), {
            click: (event, button) => {
                const rect = button.rect;
                new MoreMenu_1.default({ left: rect.right - 200, top: rect.top + 36 }).appendTo(skynode_1.BodyNode);
            },
        })), skynode_1.el("main", this.content = skynode_1.el(".content"))));
        CloneNursesContract_1.default.on("Transfer", this.transferNurseHandler);
        NursePartContract_1.default.on("TransferSingle", this.transferPartHandler);
    }
    changeBackground(src, top = "bottom") {
        this.container.style({ backgroundImage: `url(${src})`, backgroundPositionY: top });
    }
    changeParams(params, uri) { }
    close() {
        CloneNursesContract_1.default.off("Transfer", this.transferNurseHandler);
        NursePartContract_1.default.off("TransferSingle", this.transferPartHandler);
        this.container.delete();
    }
}
exports.default = Layout;
//# sourceMappingURL=Layout.js.map