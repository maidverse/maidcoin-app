import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestRNG, TestRNGInterface } from "../TestRNG";
export declare class TestRNG__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<TestRNG>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): TestRNG;
    connect(signer: Signer): TestRNG__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060e18061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806344a0a49114602d575b600080fd5b605f60383660046071565b50506040805142602080830191909152825180830382018152918301909252805191012090565b60405190815260200160405180910390f35b60008060408385031215608357600080fd5b8235915060208301356001600160a01b038116811460a057600080fd5b80915050925092905056fea2646970667358221220e0f2d82083ec4006da5d66db6726eb2d39b328a17dde09abf16d8e5c3e2d0d0864736f6c63430008050033";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): TestRNGInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TestRNG;
}
//# sourceMappingURL=TestRNG__factory.d.ts.map