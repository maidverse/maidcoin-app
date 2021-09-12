"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISupportable__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "int256",
                name: "power",
                type: "int256",
            },
        ],
        name: "ChangeSupportedPower",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "from",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "to",
                type: "uint256",
            },
        ],
        name: "ChangeSupportingRoute",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "supporter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "to",
                type: "uint256",
            },
        ],
        name: "SupportTo",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "supporter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amounts",
                type: "uint256",
            },
        ],
        name: "TransferSupportingRewards",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "supporter",
                type: "address",
            },
            {
                internalType: "int256",
                name: "power",
                type: "int256",
            },
        ],
        name: "changeSupportedPower",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "supporter",
                type: "address",
            },
        ],
        name: "checkSupportingRoute",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "supporter",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "to",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amounts",
                type: "uint256",
            },
        ],
        name: "setSupportingTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "pending",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "supporter",
                type: "address",
            },
            {
                internalType: "uint8",
                name: "supportingRatio",
                type: "uint8",
            },
        ],
        name: "shareRewards",
        outputs: [
            {
                internalType: "address",
                name: "nurseOwner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amountToNurseOwner",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "supportedPower",
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
                name: "id",
                type: "uint256",
            },
        ],
        name: "supportingRoute",
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
                internalType: "address",
                name: "supporter",
                type: "address",
            },
        ],
        name: "supportingTo",
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
                name: "id",
                type: "uint256",
            },
        ],
        name: "totalRewardsFromSupporters",
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
];
class ISupportable__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ISupportable__factory = ISupportable__factory;
ISupportable__factory.abi = _abi;
//# sourceMappingURL=ISupportable__factory.js.map