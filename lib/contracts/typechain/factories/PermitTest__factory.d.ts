import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { PermitTest } from "../PermitTest";
export declare class PermitTest__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_maidCoin: string, _maid: string, _nursePart: string, overrides?: Overrides): Promise<PermitTest>;
    getDeployTransaction(_maidCoin: string, _maid: string, _nursePart: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): PermitTest;
    connect(signer: Signer): PermitTest__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): PermitTest;
}
//# sourceMappingURL=PermitTest__factory.d.ts.map