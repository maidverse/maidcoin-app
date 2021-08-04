"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommonUtil {
    shortenAddress(address) {
        return `${address.substring(0, 6)}...${address.substring(38)}`;
    }
}
exports.default = new CommonUtil();
//# sourceMappingURL=CommonUtil.js.map