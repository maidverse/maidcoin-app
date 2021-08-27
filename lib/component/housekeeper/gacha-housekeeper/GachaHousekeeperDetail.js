"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class GachaHousekeeperDetail extends skynode_1.Popup {
    constructor() {
        super(".gacha-housekeeper-detail");
        this.append(this.content = skynode_1.el(".content"));
    }
}
exports.default = GachaHousekeeperDetail;
//# sourceMappingURL=GachaHousekeeperDetail.js.map