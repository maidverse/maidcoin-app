import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TheMaster } from "../TheMaster";
export declare class TheMaster__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_initialRewardPerBlock: BigNumberish, _decreasingInterval: BigNumberish, _startBlock: BigNumberish, _maidCoin: string, _lpToken: string, _sushi: string, overrides?: Overrides): Promise<TheMaster>;
    getDeployTransaction(_initialRewardPerBlock: BigNumberish, _decreasingInterval: BigNumberish, _startBlock: BigNumberish, _maidCoin: string, _lpToken: string, _sushi: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): TheMaster;
    connect(signer: Signer): TheMaster__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TheMaster;
}
//# sourceMappingURL=TheMaster__factory.d.ts.map