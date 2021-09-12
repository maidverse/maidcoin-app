import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IMigratorChef, IMigratorChefInterface } from "../IMigratorChef";
export declare class IMigratorChef__factory {
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
    static createInterface(): IMigratorChefInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMigratorChef;
}
//# sourceMappingURL=IMigratorChef__factory.d.ts.map