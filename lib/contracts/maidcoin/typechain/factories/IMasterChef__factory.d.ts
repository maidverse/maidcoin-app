import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IMasterChef, IMasterChefInterface } from "../IMasterChef";
export declare class IMasterChef__factory {
    static readonly abi: ({
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
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): IMasterChefInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMasterChef;
}
//# sourceMappingURL=IMasterChef__factory.d.ts.map