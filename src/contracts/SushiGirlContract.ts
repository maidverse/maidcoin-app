import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import SushiGirlArtifact from "./artifacts/contracts/SushiGirl.sol/SushiGirl.json";
import LPTokenContract from "./LPTokenContract";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { SushiGirl } from "./typechain";

export interface SushiGirlInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}

class SushiGirlContract extends ERC721EnumerableContract<SushiGirl> {

    constructor() {
        super(Config.contracts.SushiGirl, SushiGirlArtifact.abi, [
            "ChangeLPTokenToSushiGirlPower",
            "Support",
            "Desupport",
        ]);
    }

    public async getSushiGirl(sushiGirlId: number): Promise<SushiGirlInfo> {
        const [originPower, supportedLPTokenAmount] = await this.contract.sushiGirls(sushiGirlId);
        return {
            originPower: originPower.toNumber(),
            supportedLPTokenAmount,
        };
    }

    public async ownerOf(sushiGirlId: number): Promise<string> {
        return await this.contract.ownerOf(sushiGirlId);
    }

    public async powerOf(sushiGirlId: number): Promise<number> {
        return (await this.contract.powerOf(sushiGirlId)).toNumber();
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

export default new SushiGirlContract();
