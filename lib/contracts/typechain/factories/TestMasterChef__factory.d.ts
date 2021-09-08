import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { TestMasterChef } from "../TestMasterChef";
export declare class TestMasterChef__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_sushi: string, _devaddr: string, _sushiPerBlock: BigNumberish, _startBlock: BigNumberish, _bonusEndBlock: BigNumberish, overrides?: Overrides): Promise<TestMasterChef>;
    getDeployTransaction(_sushi: string, _devaddr: string, _sushiPerBlock: BigNumberish, _startBlock: BigNumberish, _bonusEndBlock: BigNumberish, overrides?: Overrides): TransactionRequest;
    attach(address: string): TestMasterChef;
    connect(signer: Signer): TestMasterChef__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): TestMasterChef;
}
//# sourceMappingURL=TestMasterChef__factory.d.ts.map