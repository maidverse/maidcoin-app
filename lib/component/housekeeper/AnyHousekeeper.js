"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
class AnyHousekeeper extends skynode_1.DomNode {
    constructor(type, id, selectable) {
        super(".any-housekeeper");
        this.type = type;
        this.id = id;
        this.selectable = selectable;
        this.load();
        if (selectable === true) {
            this.onDom("click", () => {
                this.addClass("selected");
                this.fireEvent("select");
            });
        }
    }
    async load() {
        if (this.type === "SushiGirl") {
            const result = await superagent_1.default.post(`https://api.maidcoin.org/sushigirls/${this.id}`);
            const tokenInfo = result.body;
            this.empty().append(skynode_1.el("img.image", { src: tokenInfo.face_image }), skynode_1.el(".name", tokenInfo.name));
        }
    }
    deselect() {
        this.deleteClass("selected");
    }
}
exports.default = AnyHousekeeper;
//# sourceMappingURL=AnyHousekeeper.js.map