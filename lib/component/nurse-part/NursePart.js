"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class NursePart extends skynode_1.DomNode {
    constructor(nurseType, nursePartCount) {
        super(".nurse-part");
        this.append(skynode_1.el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType}.png`, height: "60" }), skynode_1.el("span.count", String(nursePartCount)));
    }
}
exports.default = NursePart;
//# sourceMappingURL=NursePart.js.map