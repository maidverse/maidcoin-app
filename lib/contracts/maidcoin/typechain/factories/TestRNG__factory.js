"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRNG__factory = void 0;
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
const _bytecode = "0x608060405234801561001057600080fd5b5060e18061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806344a0a49114602d575b600080fd5b605f60383660046071565b50506040805142602080830191909152825180830382018152918301909252805191012090565b60405190815260200160405180910390f35b60008060408385031215608357600080fd5b8235915060208301356001600160a01b038116811460a057600080fd5b80915050925092905056fea2646970667358221220e0f2d82083ec4006da5d66db6726eb2d39b328a17dde09abf16d8e5c3e2d0d0864736f6c63430008050033";
class TestRNG__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.TestRNG__factory = TestRNG__factory;
TestRNG__factory.bytecode = _bytecode;
TestRNG__factory.abi = _abi;
//# sourceMappingURL=TestRNG__factory.js.map