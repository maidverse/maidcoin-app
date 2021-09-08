import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TestSushiToken } from "../TestSushiToken";
export declare class TestSushiToken__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<TestSushiToken>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): TestSushiToken;
    connect(signer: Signer): TestSushiToken__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TestSushiToken;
}
//# sourceMappingURL=TestSushiToken__factory.d.ts.map