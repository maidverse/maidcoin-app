import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IUniswapV2ERC20, IUniswapV2ERC20Interface } from "../IUniswapV2ERC20";
export declare class IUniswapV2ERC20__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): IUniswapV2ERC20Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): IUniswapV2ERC20;
}
//# sourceMappingURL=IUniswapV2ERC20__factory.d.ts.map