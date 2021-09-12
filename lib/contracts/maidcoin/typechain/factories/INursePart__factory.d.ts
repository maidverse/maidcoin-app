import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { INursePart, INursePartInterface } from "../INursePart";
export declare class INursePart__factory {
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
    static createInterface(): INursePartInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): INursePart;
}
//# sourceMappingURL=INursePart__factory.d.ts.map