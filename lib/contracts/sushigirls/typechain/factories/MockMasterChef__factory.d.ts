import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { ContractFactory, Overrides } from "@ethersproject/contracts";
import type { MockMasterChef } from "../MockMasterChef";
export declare class MockMasterChef__factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_sushi: string, _devaddr: string, _sushiPerBlock: BigNumberish, _startBlock: BigNumberish, _bonusEndBlock: BigNumberish, overrides?: Overrides): Promise<MockMasterChef>;
    getDeployTransaction(_sushi: string, _devaddr: string, _sushiPerBlock: BigNumberish, _startBlock: BigNumberish, _bonusEndBlock: BigNumberish, overrides?: Overrides): TransactionRequest;
    attach(address: string): MockMasterChef;
    connect(signer: Signer): MockMasterChef__factory;
    static connect(address: string, signerOrProvider: Signer | Provider): MockMasterChef;
}
//# sourceMappingURL=MockMasterChef__factory.d.ts.map