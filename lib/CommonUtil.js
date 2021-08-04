"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("./Config"));
class CommonUtil {
    shortenAddress(address) {
        return `${address.substring(0, 6)}...${address.substring(38)}`;
    }
    displayBlockDuration(blockCount) {
        let seconds = blockCount * Config_1.default.blockTimeSecond;
        const day = Math.floor(seconds / 86400);
        seconds -= day * 86400;
        const hour = Math.floor(seconds / 3600);
        seconds -= hour * 3600;
        const minute = Math.floor(seconds / 60);
        seconds -= minute * 60;
        return day === 0 ? `${hour}h ${minute}m` : `${day}d ${hour}h ${minute}m`;
    }
}
exports.default = new CommonUtil();
//# sourceMappingURL=CommonUtil.js.map