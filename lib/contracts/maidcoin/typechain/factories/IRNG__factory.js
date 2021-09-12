"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRNG__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "seed",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "generateRandomNumber",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IRNG__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IRNG__factory = IRNG__factory;
IRNG__factory.abi = _abi;
//# sourceMappingURL=IRNG__factory.js.map