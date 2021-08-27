import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { SushiGirl } from "../SushiGirl";
export declare class SushiGirl__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_lpToken: string, _sushi: string, overrides?: Overrides): Promise<SushiGirl>;
    getDeployTransaction(_lpToken: string, _sushi: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): SushiGirl;
    connect(signer: Signer): SushiGirl__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): SushiGirl;
}
//# sourceMappingURL=SushiGirl__factory.d.ts.map