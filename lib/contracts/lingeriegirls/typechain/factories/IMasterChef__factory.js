"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMasterChef__factory = void 0;
const ethers_1 = require("ethers");
class IMasterChef__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IMasterChef__factory = IMasterChef__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "pendingSushi",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "pid",
                type: "uint256",
            },
        ],
        name: "poolInfo",
        outputs: [
            {
                components: [
                    {
                        internalType: "contract IERC20",
                        name: "lpToken",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "allocPoint",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "lastRewardBlock",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "accSushiPerShare",
                        type: "uint256",
                    },
                ],
                internalType: "struct IMasterChef.PoolInfo",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "pid",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "userInfo",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "rewardDebt",
                        type: "uint256",
                    },
                ],
                internalType: "struct IMasterChef.UserInfo",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_pid",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
//# sourceMappingURL=IMasterChef__factory.js.map