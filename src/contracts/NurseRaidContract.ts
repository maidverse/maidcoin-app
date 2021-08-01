import { BigNumber, BigNumberish, constants } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import NurseRaidArtifact from "./artifacts/contracts/NurseRaid.sol/NurseRaid.json";
import Contract from "./Contract";
import MaidCoinContract from "./MaidCoinContract";
import MaidContract from "./MaidContract";
import { NurseRaid } from "./typechain";

export interface RaidInfo {
    entranceFee: BigNumber;
    nursePart: number;
    maxRewardCount: number;
    duration: number;
    endBlock: number;
}

export interface ChallengerInfo {
    enterBlock: number;
    maid: BigNumber;
}

class NurseRaidContract extends Contract<NurseRaid> {

    constructor() {
        super(Config.contracts.NurseRaid, NurseRaidArtifact.abi, [
            "Create",
            "Enter",
            "Exit",
            "ChangeMaidPowerToRaidReducedBlock",
        ]);
    }

    public async getRaidCount(): Promise<BigNumber> {
        return await this.contract.raidCount();
    }

    public async getRaid(raidId: number): Promise<RaidInfo> {
        const [entranceFee, nursePart, maxRewardCount, duration, endBlock] = await this.contract.raids(raidId);
        return {
            entranceFee,
            nursePart: nursePart.toNumber(),
            maxRewardCount: maxRewardCount.toNumber(),
            duration: duration.toNumber(),
            endBlock: endBlock.toNumber(),
        };
    }

    public async getChallenger(raidId: number, owner: string): Promise<ChallengerInfo> {
        const [enterBlock, maid] = await this.contract.challengers(raidId, owner);
        return {
            enterBlock: enterBlock.toNumber(),
            maid,
        };
    }

    public async checkDone(raidId: number): Promise<boolean | undefined> {
        return await this.walletContract?.checkDone(raidId);
    }

    public async create(
        entranceFee: BigNumberish,
        nursePart: BigNumberish,
        maxRewardCount: BigNumberish,
        duration: BigNumberish,
        endBlock: BigNumberish,
    ) {
        const contract = await this.loadWalletContract();
        await contract?.create(entranceFee, nursePart, maxRewardCount, duration, endBlock);
    }

    public async enter(raidId: number, maid?: number) {

        const contract = await this.loadWalletContract();
        const owner = await Wallet.loadAddress();
        if (contract !== undefined && owner !== undefined) {

            const raid = await this.getRaid(raidId);

            if (
                (await MaidCoinContract.allowance(owner, this.address)).lt(raid.entranceFee) ||
                await MaidContract.isApprovedForAll(owner, this.address) !== true
            ) {
                const deadline = Math.ceil(Date.now() / 1000) + 1000000;

                const maidCoinSigned = await Wallet.signERC20Permit(

                    await MaidCoinContract.getName(),
                    "1",
                    MaidCoinContract.address,

                    this.address,
                    constants.MaxUint256,
                    await MaidCoinContract.getNonce(owner),
                    deadline,
                );

                const maidSigned = await Wallet.signERC721PermitAll(

                    await MaidContract.getName(),
                    "1",
                    MaidContract.address,

                    this.address,
                    await MaidContract.getNonceForAll(owner),
                    deadline,
                );

                await contract.enterWithPermitAll(
                    raidId, maid === undefined ? constants.MaxUint256 : maid, deadline,
                    maidCoinSigned.v, maidCoinSigned.r, maidCoinSigned.s,
                    maidSigned.v, maidSigned.r, maidSigned.s,
                );
            }

            else {
                await contract.enter(
                    raidId, maid === undefined ? constants.MaxUint256 : maid,
                );
            }
        }
    }

    public async exit(raidId: number) {
        const contract = await this.loadWalletContract();
        await contract?.exit(raidId);
    }
}

export default new NurseRaidContract();
