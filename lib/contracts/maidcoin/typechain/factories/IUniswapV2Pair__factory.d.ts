import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IUniswapV2Pair, IUniswapV2PairInterface } from "../IUniswapV2Pair";
export declare class IUniswapV2Pair__factory {
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
    static createInterface(): IUniswapV2PairInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IUniswapV2Pair;
}
//# sourceMappingURL=IUniswapV2Pair__factory.d.ts.map