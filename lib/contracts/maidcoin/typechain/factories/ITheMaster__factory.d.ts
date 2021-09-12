import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITheMaster, ITheMasterInterface } from "../ITheMaster";
export declare class ITheMaster__factory {
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
    static createInterface(): ITheMasterInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ITheMaster;
}
//# sourceMappingURL=ITheMaster__factory.d.ts.map