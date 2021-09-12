import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IMaidCoin, IMaidCoinInterface } from "../IMaidCoin";
export declare class IMaidCoin__factory {
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
    static createInterface(): IMaidCoinInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMaidCoin;
}
//# sourceMappingURL=IMaidCoin__factory.d.ts.map