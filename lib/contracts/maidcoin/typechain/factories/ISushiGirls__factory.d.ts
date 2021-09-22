import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISushiGirls, ISushiGirlsInterface } from "../ISushiGirls";
export declare class ISushiGirls__factory {
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
    static createInterface(): ISushiGirlsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISushiGirls;
}
//# sourceMappingURL=ISushiGirls__factory.d.ts.map