import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MaidCafe } from "../MaidCafe";
export declare class MaidCafe__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_maidCoin: string, overrides?: Overrides): Promise<MaidCafe>;
    getDeployTransaction(_maidCoin: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): MaidCafe;
    connect(signer: Signer): MaidCafe__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MaidCafe;
}
//# sourceMappingURL=MaidCafe__factory.d.ts.map