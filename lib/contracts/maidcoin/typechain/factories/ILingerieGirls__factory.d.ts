import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ILingerieGirls, ILingerieGirlsInterface } from "../ILingerieGirls";
export declare class ILingerieGirls__factory {
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
    static createInterface(): ILingerieGirlsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ILingerieGirls;
}
//# sourceMappingURL=ILingerieGirls__factory.d.ts.map