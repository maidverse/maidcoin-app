"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const LingerieGirlDetail_1 = __importDefault(require("./lingeriegirl/LingerieGirlDetail"));
const SushiGirlDetail_1 = __importDefault(require("./sushigirl/SushiGirlDetail"));
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
        if (this.type === "LingerieGirl") {
            const result = await superagent_1.default.post(`https://api.maidcoin.org/lingeriegirls/${this.id}`);
            const tokenInfo = result.body;
            this.append(skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/LingerieGirl/Face/${this.id}.png` }), skynode_1.el(".name", tokenInfo.name));
            if (this.selectable !== true) {
                this.onDom("click", () => new SushiGirlDetail_1.default(this.id));
            }
        }
        else if (this.type === "SushiGirl") {
            const result = await superagent_1.default.post(`https://api.maidcoin.org/sushigirls/${this.id}`);
            const tokenInfo = result.body;
            this.append(skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/SushiGirl/Face/${this.id}.png` }), skynode_1.el(".name", tokenInfo.name));
            if (this.selectable !== true) {
                this.onDom("click", () => new LingerieGirlDetail_1.default(this.id));
            }
        }
    }
    deselect() {
        this.deleteClass("selected");
    }
}
exports.default = AnyHousekeeper;
//# sourceMappingURL=AnyHousekeeper.js.map