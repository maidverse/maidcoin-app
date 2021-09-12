"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IUniswapV2Callee__factory = void 0;
const ethers_1 = require("ethers");
class IUniswapV2Callee__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IUniswapV2Callee__factory = IUniswapV2Callee__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "sender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount0",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount1",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "uniswapV2Call",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
//# sourceMappingURL=IUniswapV2Callee__factory.js.map