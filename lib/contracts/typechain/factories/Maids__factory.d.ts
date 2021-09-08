import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Maids } from "../Maids";
export declare class Maids__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_lpToken: string, _sushi: string, overrides?: Overrides): Promise<Maids>;
    getDeployTransaction(_lpToken: string, _sushi: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): Maids;
    connect(signer: Signer): Maids__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Maids;
}
//# sourceMappingURL=Maids__factory.d.ts.map