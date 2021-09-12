import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Housekeeper } from "../Housekeeper";
export declare class Housekeeper__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_lpToken: string, overrides?: Overrides): Promise<Housekeeper>;
    getDeployTransaction(_lpToken: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): Housekeeper;
    connect(signer: Signer): Housekeeper__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Housekeeper;
}
//# sourceMappingURL=Housekeeper__factory.d.ts.map