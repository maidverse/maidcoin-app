import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IMasterChefModule, IMasterChefModuleInterface } from "../IMasterChefModule";
export declare class IMasterChefModule__factory {
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IMasterChefModuleInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMasterChefModule;
}
//# sourceMappingURL=IMasterChefModule__factory.d.ts.map