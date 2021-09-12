import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ICloneNurseEnumerable, ICloneNurseEnumerableInterface } from "../ICloneNurseEnumerable";
export declare class ICloneNurseEnumerable__factory {
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
    static createInterface(): ICloneNurseEnumerableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ICloneNurseEnumerable;
}
//# sourceMappingURL=ICloneNurseEnumerable__factory.d.ts.map