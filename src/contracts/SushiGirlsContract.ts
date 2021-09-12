import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import SushiGirlsArtifact from "./sushigirls/artifacts/contracts/SushiGirls.sol/SushiGirls.json";
import LPTokenContract from "./LPTokenContract";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { SushiGirls } from "./sushigirls/typechain";

export interface SushiGirlInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}

class SushiGirlsContract extends ERC721EnumerableContract<SushiGirls> {

    constructor() {
        super(Config.contracts.SushiGirls, SushiGirlsArtifact.abi, [
            "ChangeLPTokenToSushiGirlPower",
            "Support",
            "Desupport",
        ]);
    }

    public async getSushiGirl(id: number): Promise<SushiGirlInfo> {
        const [originPower, supportedLPTokenAmount] = await this.contract.sushiGirls(id);
        return {
            originPower: originPower.toNumber(),
            supportedLPTokenAmount,
        };
    }

    public async ownerOf(id: number): Promise<string> {
        return await this.contract.ownerOf(id);
    }

    public async powerOf(id: number): Promise<number> {
        return (await this.contract.powerOf(id)).toNumber();
    }

    public async support(id: BigNumberish, lpTokenAmount: BigNumberish) {

        const contract = await this.connectAndGetWalletContract();
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

export default new SushiGirlsContract();
