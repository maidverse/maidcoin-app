import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { NursePart } from "../NursePart";
export declare class NursePart__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<NursePart>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): NursePart;
    connect(signer: Signer): NursePart__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): NursePart;
}
//# sourceMappingURL=NursePart__factory.d.ts.map