import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IRNG, IRNGInterface } from "../IRNG";
export declare class IRNG__factory {
    static readonly abi: {
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
    }[];
    static createInterface(): IRNGInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRNG;
}
//# sourceMappingURL=IRNG__factory.d.ts.map