import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MaidCoin } from "../MaidCoin";
export declare class MaidCoin__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<MaidCoin>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): MaidCoin;
    connect(signer: Signer): MaidCoin__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MaidCoin;
}
//# sourceMappingURL=MaidCoin__factory.d.ts.map