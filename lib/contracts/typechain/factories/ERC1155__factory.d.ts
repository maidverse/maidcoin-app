import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { ERC1155 } from "../ERC1155";
export declare class ERC1155__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(uri_: string, overrides?: Overrides): Promise<ERC1155>;
    getDeployTransaction(uri_: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): ERC1155;
    connect(signer: Signer): ERC1155__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC1155;
}
//# sourceMappingURL=ERC1155__factory.d.ts.map