import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { ERC1155Holder } from "../ERC1155Holder";
export declare class ERC1155Holder__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: Overrides): Promise<ERC1155Holder>;
    getDeployTransaction(overrides?: Overrides): TransactionRequest;
    attach(address: string): ERC1155Holder;
    connect(signer: Signer): ERC1155Holder__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC1155Holder;
}
//# sourceMappingURL=ERC1155Holder__factory.d.ts.map