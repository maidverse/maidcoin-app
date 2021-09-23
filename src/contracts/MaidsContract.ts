import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import LPTokenContract from "./LPTokenContract";
import MaidsArtifact from "./maidcoin/artifacts/contracts/Maids.sol/Maids.json";
import { Maids } from "./maidcoin/typechain";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";

class MaidsContract extends ERC721EnumerableContract<Maids> {

    constructor() {
        super(Config.contracts.Maids, MaidsArtifact.abi, [
            "Support",
            "Desupport",
        ]);
    }

    public async getSupportedLP(id: number): Promise<BigNumber> {
        const [, supportedLPTokenAmount] = await this.contract.maids(id);
        return supportedLPTokenAmount;
    }

    public async ownerOf(maidId: number): Promise<string> {
        return await this.contract.ownerOf(maidId);
    }

    public async mint(power: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.mint(power);
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

    public async desupport(id: BigNumberish, lpTokenAmount: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.desupport(id, lpTokenAmount);
    }
}

export default new MaidsContract();
