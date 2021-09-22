"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ILingerieGirls__factory = void 0;
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
        name: "lingerieGirls",
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
class ILingerieGirls__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ILingerieGirls__factory = ILingerieGirls__factory;
ILingerieGirls__factory.abi = _abi;
//# sourceMappingURL=ILingerieGirls__factory.js.map