import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { SushiGirls } from "../SushiGirls";
export declare class SushiGirls__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_lpToken: string, _sushi: string, overrides?: Overrides): Promise<SushiGirls>;
    getDeployTransaction(_lpToken: string, _sushi: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): SushiGirls;
    connect(signer: Signer): SushiGirls__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): SushiGirls;
}
//# sourceMappingURL=SushiGirls__factory.d.ts.map