import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TestLPToken } from "../TestLPToken";
export declare class TestLPToken__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<TestLPToken>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): TestLPToken;
    connect(signer: Signer): TestLPToken__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TestLPToken;
}
//# sourceMappingURL=TestLPToken__factory.d.ts.map