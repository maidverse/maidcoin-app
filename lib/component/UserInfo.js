"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
class UserInfo extends skynode_1.DomNode {
    constructor() {
        super(".user-info");
        this.append(skynode_1.el("a.connect-button", "Connect", {}));
    }
}
exports.default = UserInfo;
//# sourceMappingURL=UserInfo.js.map