"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const skyutil_1 = __importDefault(require("skyutil"));
const LingerieGirlsContract_1 = __importDefault(require("../../../contracts/LingerieGirlsContract"));
const LingerieGirl_1 = __importDefault(require("./LingerieGirl"));
class LingerieGirlList extends skynode_1.DomNode {
    constructor() {
        super(".lingeriegirl-list");
        this.loadLingerieGirls();
    }
    async loadLingerieGirls() {
        const count = (await LingerieGirlsContract_1.default.getTotalSupply()).toNumber();
        skyutil_1.default.repeat(count, (id) => {
            setTimeout(() => {
                if (this.deleted !== true) {
                    new LingerieGirl_1.default(id).appendTo(this);
                }
            }, id * 50);
        });
    }
}
exports.default = LingerieGirlList;
//# sourceMappingURL=LingerieGirlList.js.map