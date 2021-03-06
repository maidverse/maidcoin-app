"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC165__factory = void 0;
const ethers_1 = require("ethers");
class ERC165__factory {
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ERC165__factory = ERC165__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
//# sourceMappingURL=ERC165__factory.js.map