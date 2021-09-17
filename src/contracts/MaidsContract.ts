import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import MaidsArtifact from "./maidcoin/artifacts/contracts/Maids.sol/Maids.json";
import LPTokenContract from "./LPTokenContract";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { Maids } from "./maidcoin/typechain";

export interface MaidInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}

class MaidsContract extends ERC721EnumerableContract<Maids> {

    constructor() {
        super(Config.contracts.Maids, MaidsArtifact.abi, [
            "ChangeLPTokenToMaidPower",
            "Support",
            "Desupport",
        ]);
    }

    public async getMaid(maidId: number): Promise<MaidInfo> {
        const [originPower, supportedLPTokenAmount] = await this.contract.maids(maidId);
        return {
            originPower: originPower.toNumber(),
            supportedLPTokenAmount,
        };
    }

    public async ownerOf(maidId: number): Promise<string> {
        return await this.contract.ownerOf(maidId);
    }

    public async powerOf(maidId: number): Promise<number> {
        return (await this.contract.powerOf(maidId)).toNumber();
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
}

export default new MaidsContract();
