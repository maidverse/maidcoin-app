"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const maids_json_1 = __importDefault(require("../../json/maids.json"));
const MaidDetail_1 = __importDefault(require("./MaidDetail"));
class MaidBook extends skynode_1.DomNode {
    constructor(maidId) {
        super(".maid-book");
        const maidInfo = maids_json_1.default[maidId];
        this.style({
            backgroundImage: `url(https://storage.googleapis.com/maidcoin/Maid/Catalog/${maidInfo.name}Catalog.png)`,
        });
        this.append(skynode_1.el("a.name", maidInfo.name));
        this.onDom("click", () => new MaidDetail_1.default(maidId));
    }
}
exports.default = MaidBook;
//# sourceMappingURL=MaidBook.js.map