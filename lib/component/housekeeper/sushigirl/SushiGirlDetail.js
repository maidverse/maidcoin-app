"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class SushiGirlDetail extends skynode_1.Popup {
    constructor() {
        super(".sushigirl-detail");
        this.append(this.content = skynode_1.el(".content"));
    }
}
exports.default = SushiGirlDetail;
//# sourceMappingURL=SushiGirlDetail.js.map