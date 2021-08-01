import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MasterCoin } from "../MasterCoin";
export declare class MasterCoin__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<MasterCoin>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): MasterCoin;
    connect(signer: Signer): MasterCoin__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MasterCoin;
}
//# sourceMappingURL=MasterCoin__factory.d.ts.map