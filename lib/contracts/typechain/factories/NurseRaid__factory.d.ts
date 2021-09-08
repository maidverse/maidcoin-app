import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { NurseRaid } from "../NurseRaid";
export declare class NurseRaid__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_maidCoin: string, _maidCafe: string, _nursePart: string, _rng: string, overrides?: Overrides): Promise<NurseRaid>;
    getDeployTransaction(_maidCoin: string, _maidCafe: string, _nursePart: string, _rng: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): NurseRaid;
    connect(signer: Signer): NurseRaid__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): NurseRaid;
}
//# sourceMappingURL=NurseRaid__factory.d.ts.map