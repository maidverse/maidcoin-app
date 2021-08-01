import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TestRNG } from "../TestRNG";
export declare class TestRNG__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<TestRNG>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): TestRNG;
    connect(signer: Signer): TestRNG__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TestRNG;
}
//# sourceMappingURL=TestRNG__factory.d.ts.map