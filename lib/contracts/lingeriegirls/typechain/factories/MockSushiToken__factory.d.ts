import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MockSushiToken } from "../MockSushiToken";
export declare class MockSushiToken__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<MockSushiToken>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): MockSushiToken;
    connect(signer: Signer): MockSushiToken__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MockSushiToken;
}
//# sourceMappingURL=MockSushiToken__factory.d.ts.map