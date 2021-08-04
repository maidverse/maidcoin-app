import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import MaidArtifact from "./artifacts/contracts/Maid.sol/Maid.json";
import LPTokenContract from "./LPTokenContract";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { Maid } from "./typechain";

export interface MaidInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}

class MaidContract extends ERC721EnumerableContract<Maid> {

    constructor() {
        super(Config.contracts.Maid, MaidArtifact.abi, [
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

    public async ownerOf(nurseId: number): Promise<string> {
        return await this.contract.ownerOf(nurseId);
    }

    public async mint(power: BigNumberish) {
        const contract = await this.loadWalletContract();
        await contract?.mint(power);
    }

    public async support(id: BigNumberish, lpTokenAmount: BigNumberish) {

        const contract = await this.loadWalletContract();
        const owner = await Wallet.loadAddress();
        if (contract !== undefined && owner !== undefined) {

            if (await LPTokenContract.allowance(owner, this.address) < lpTokenAmount) {

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

export default new MaidContract();
