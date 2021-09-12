import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { UniswapV2ERC20 } from "../UniswapV2ERC20";
export declare class UniswapV2ERC20__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_name: string, _symbol: string, overrides?: Overrides): Promise<UniswapV2ERC20>;
    getDeployTransaction(_name: string, _symbol: string, overrides?: Overrides): TransactionRequest;
    attach(address: string): UniswapV2ERC20;
    connect(signer: Signer): UniswapV2ERC20__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): UniswapV2ERC20;
}
//# sourceMappingURL=UniswapV2ERC20__factory.d.ts.map