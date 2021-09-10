import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { CloneNurses } from "../CloneNurses";
export declare class CloneNurses__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_nursePart: string, _maidCoin: string, _theMaster: string, _royaltyReceiver: string, overrides?: Overrides): Promise<CloneNurses>;
    getDeployTransaction(_nursePart: string, _maidCoin: string, _theMaster: string, _royaltyReceiver: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): CloneNurses;
    connect(signer: Signer): CloneNurses__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): CloneNurses;
}
//# sourceMappingURL=CloneNurses__factory.d.ts.map