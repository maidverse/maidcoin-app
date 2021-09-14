"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const superagent_1 = __importDefault(require("superagent"));
class Maid extends skynode_1.DomNode {
    constructor(maidId) {
        super(".maid");
        this.maidId = maidId;
        this.load();
        this.onDom("click", () => {
            this.addClass("selected");
            this.fireEvent("select");
        });
    }
    async load() {
        const result = await superagent_1.default.get(`https://api.maidcoin.org/maids/${this.maidId}`);
        const tokenInfo = result.body;
        this.empty().append(skynode_1.el("img.image", { src: `https://storage.googleapis.com/maidcoin/Maid/Face/${this.maidId}.png` }), skynode_1.el(".name", tokenInfo.name));
    }
    deselect() {
        this.deleteClass("selected");
    }
}
exports.default = Maid;
//# sourceMappingURL=Maid.js.map