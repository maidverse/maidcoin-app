"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const TheMasterContract_1 = __importDefault(require("../../contracts/TheMasterContract"));
const Wallet_1 = __importDefault(require("../../ethereum/Wallet"));
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