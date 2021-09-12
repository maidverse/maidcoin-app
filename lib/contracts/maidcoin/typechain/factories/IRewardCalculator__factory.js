"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRewardCalculator__factory = void 0;
const ethers_1 = require("ethers");
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
class IRewardCalculator__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IRewardCalculator__factory = IRewardCalculator__factory;
IRewardCalculator__factory.abi = _abi;
//# sourceMappingURL=IRewardCalculator__factory.js.map