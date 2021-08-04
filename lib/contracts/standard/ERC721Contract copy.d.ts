import { BigNumber, BigNumberish, ContractInterface, ethers } from "ethers";
import Contract from "../Contract";
export default abstract class ERC721Contract<CT extends ethers.Contract> extends Contract<CT> {
    constructor(address: string, abi: ContractInterface, eventNames: string[]);
    getName(): Promise<string>;
    getTotalSupply(): Promise<BigNumber>;
    balanceOf(owner: string): Promise<BigNumber>;
    getNonce(id: BigNumberish): Promise<BigNumber>;
    getNonceForAll(owner: string): Promise<BigNumber>;
    isApprovedForAll(owner: string, operator: string): Promise<boolean>;
}
//# sourceMappingURL=ERC721Contract%20copy.d.ts.map