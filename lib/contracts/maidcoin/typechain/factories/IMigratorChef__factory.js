"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMigratorChef__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract IERC20",
                name: "token",
                type: "address",
            },
        ],
        name: "migrate",
        outputs: [
            {
                internalType: "contract IERC20",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
class IMigratorChef__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.IMigratorChef__factory = IMigratorChef__factory;
IMigratorChef__factory.abi = _abi;
//# sourceMappingURL=IMigratorChef__factory.js.map