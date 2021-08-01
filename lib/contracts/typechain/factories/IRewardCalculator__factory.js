"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRewardCalculator__factory = void 0;
const ethers_1 = require("ethers");
class IRewardCalculator__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IRewardCalculator__factory = IRewardCalculator__factory;
const _abi = [
    {
        inputs: [],
        name: "rewardPerBlock",
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
//# sourceMappingURL=IRewardCalculator__factory.js.map