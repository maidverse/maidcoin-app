"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("./Config"));
class CommonUtil {
    shortenAddress(address) {
        return `${address.substring(0, 6)}...${address.substring(38)}`;
    }
    displayBlockDuration(blockCount) {
        if (blockCount < 0) {
            return "0s";
        }
        let seconds = blockCount * Config_1.default.blockTimeSecond;
        const day = Math.floor(seconds / 86400);
        seconds -= day * 86400;
        const hour = Math.floor(seconds / 3600);
        seconds -= hour * 3600;
        const minute = Math.floor(seconds / 60);
        seconds -= minute * 60;
        if (day !== 0) {
            return `${day}d ${hour}h ${minute}m ${seconds}s`;
        }
        else if (hour !== 0) {
            return `${hour}h ${minute}m ${seconds}s`;
        }
        else if (minute !== 0) {
            return `${minute}m ${seconds}s`;
        }
        else {
            return `${seconds}s`;
        }
    }
    numberWithCommas(x, fractionDigits = 3) {
        const parts = String(+(+x).toFixed(fractionDigits)).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
    displayPrice(amount) {
        return this.numberWithCommas(ethers_1.utils.formatEther(amount), 5);
    }
}
exports.default = new CommonUtil();
//# sourceMappingURL=CommonUtil.js.map