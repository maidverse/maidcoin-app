"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class Loading extends skynode_1.DomNode {
    constructor() {
        super(".loading");
        this.append(skynode_1.el("img", {
            src: "https://storage.googleapis.com/maidcoin/loading.png",
            height: "140",
        }));
    }
}
exports.default = Loading;
//# sourceMappingURL=Loading.js.map