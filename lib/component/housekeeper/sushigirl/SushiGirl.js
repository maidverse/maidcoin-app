"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
const SushiGirlDetail_1 = __importDefault(require("./SushiGirlDetail"));
class SushiGirl extends skynode_1.DomNode {
    constructor(id) {
        super(".sushigirl");
        this.id = id;
        this.load();
        this.onDom("click", () => new SushiGirlDetail_1.default(id));
    }
    async load() {
        const result = await superagent_1.default.get(`https://api.maidcoin.org/sushigirls/${this.id}`);
        const tokenInfo = result.body;
        this.empty().append(skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/SushiGirl/Face/${this.id}.png` }), skynode_1.el(".name", tokenInfo.name));
    }
}
exports.default = SushiGirl;
//# sourceMappingURL=SushiGirl.js.map