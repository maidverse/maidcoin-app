import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MockERC20 } from "../MockERC20";
export declare class MockERC20__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<MockERC20>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): MockERC20;
    connect(signer: Signer): MockERC20__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MockERC20;
}
//# sourceMappingURL=MockERC20__factory.d.ts.map