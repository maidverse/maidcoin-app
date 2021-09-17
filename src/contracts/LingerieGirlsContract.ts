import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import LingerieGirlsArtifact from "./lingeriegirls/artifacts/contracts/LingerieGirls.sol/LingerieGirls.json";
import LPTokenContract from "./LPTokenContract";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { LingerieGirls } from "./lingeriegirls/typechain";

export interface LingerieGirlInfo {
    originPower: number;
    supportedLPTokenAmount: BigNumber;
}

class LingerieGirlsContract extends ERC721EnumerableContract<LingerieGirls> {

    constructor() {
        super(Config.contracts.LingerieGirls, LingerieGirlsArtifact.abi, [
            "ChangeLPTokenToLingerieGirlPower",
            "Support",
            "Desupport",
        ]);
    }

    public async getLingerieGirl(id: number): Promise<LingerieGirlInfo> {
        const [originPower, supportedLPTokenAmount] = await this.contract.lingerieGirls(id);
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

export default new LingerieGirlsContract();
