"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISushiGirls__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "sushiGirls",
        outputs: [
            {
                internalType: "uint256",
                name: "originPower",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "supportedLPTokenAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "sushiRewardDebt",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class ISushiGirls__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ISushiGirls__factory = ISushiGirls__factory;
ISushiGirls__factory.abi = _abi;
//# sourceMappingURL=ISushiGirls__factory.js.map