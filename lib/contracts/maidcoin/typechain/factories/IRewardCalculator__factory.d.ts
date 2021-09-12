import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IRewardCalculator, IRewardCalculatorInterface } from "../IRewardCalculator";
export declare class IRewardCalculator__factory {
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
    static createInterface(): IRewardCalculatorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRewardCalculator;
}
//# sourceMappingURL=IRewardCalculator__factory.d.ts.map