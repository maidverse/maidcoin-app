import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import LPTokenContract from "./LPTokenContract";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import SushiGirlsArtifact from "./sushigirls/artifacts/contracts/SushiGirls.sol/SushiGirls.json";
import { SushiGirls } from "./sushigirls/typechain";

class SushiGirlsContract extends ERC721EnumerableContract<SushiGirls> {

    constructor() {
        super(Config.contracts.SushiGirls, SushiGirlsArtifact.abi, [
            "Support",
            "Desupport",
        ]);
    }

    public async getSupportedLP(id: number): Promise<BigNumber> {
        const [, supportedLPTokenAmount] = await this.contract.sushiGirls(id);
        return supportedLPTokenAmount;
    }

    public async ownerOf(id: number): Promise<string> {
        return await this.contract.ownerOf(id);
    }

    public async support(id: BigNumberish, lpTokenAmount: BigNumberish) {

        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet.loadAddress();
        if (contract !== undefined && owner !== undefined) {

            if ((await LPTokenContract.allowance(owner, this.address)).lt(lpTokenAmount)) {

                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const signed = await Wallet.signERC20Permit(

                    await LPTokenContract.getName(),
                    "1",
                    LPTokenContract.address,

                    this.address,
                    lpTokenAmount,
                    await LPTokenContract.getNonce(owner),
                    deadline,
                );

                await contract.supportWithPermit(id, lpTokenAmount, deadline, signed.v, signed.r, signed.s);
            } else {
                await contract.support(id, lpTokenAmount);
            }
        }
    }
}

export default new SushiGirlsContract();
