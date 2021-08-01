import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { Maid } from "../Maid";
export declare class Maid__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_lpToken: string, overrides?: Overrides): Promise<Maid>;
    getDeployTransaction(_lpToken: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): Maid;
    connect(signer: Signer): Maid__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): Maid;
}
//# sourceMappingURL=Maid__factory.d.ts.map