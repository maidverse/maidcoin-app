import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IMaids, IMaidsInterface } from "../IMaids";
export declare class IMaids__factory {
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
    static createInterface(): IMaidsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMaids;
}
//# sourceMappingURL=IMaids__factory.d.ts.map