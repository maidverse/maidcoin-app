import { BigNumber, BigNumberish, constants } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import NurseRaidArtifact from "./artifacts/contracts/NurseRaid.sol/NurseRaid.json";
import Contract from "./Contract";
import MaidCoinContract from "./MaidCoinContract";
import MaidsContract from "./MaidsContract";
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
    maids: string;
    maidId: BigNumber;
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
        const [enterBlock, maids, maidId] = await this.contract.challengers(raidId, owner);
        return {
            enterBlock: enterBlock.toNumber(),
            maids,
            maidId,
        };
    }

    public async checkDone(raidId: number): Promise<boolean | undefined> {
        const contract = await this.getWalletContract();
        return await contract?.checkDone(raidId);
    }

    public async create(
        entranceFee: BigNumberish,
        nursePart: BigNumberish,
        maxRewardCount: BigNumberish,
        duration: BigNumberish,
        endBlock: BigNumberish,
    ) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.create(entranceFee, nursePart, maxRewardCount, duration, endBlock);
    }

    public async enter(raidId: number, maids: string, maidId?: number) {

        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet.loadAddress();
        if (contract !== undefined && owner !== undefined) {

            const raid = await this.getRaid(raidId);

            if (
                (await MaidCoinContract.allowance(owner, this.address)).lt(raid.entranceFee) ||
                await MaidsContract.isApprovedForAll(owner, this.address) !== true
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

                    await MaidsContract.getName(),
                    "1",
                    MaidsContract.address,

                    this.address,
                    await MaidsContract.getNonceForAll(owner),
                    deadline,
                );

                await contract.enterWithPermitAll(
                    raidId, maids, maidId === undefined ? constants.MaxUint256 : maidId, deadline,
                    maidCoinSigned.v, maidCoinSigned.r, maidCoinSigned.s,
                    maidSigned.v, maidSigned.r, maidSigned.s,
                );
            }

            else {
                await contract.enter(
                    raidId, maids, maidId === undefined ? constants.MaxUint256 : maidId,
                );
            }
        }
    }

    public async exit(raidId: number) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.exit(raidId);
    }
}

export default new NurseRaidContract();
