import { BigNumber, BigNumberish, constants } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import Contract from "./Contract";
import LingerieGirlsContract from "./LingerieGirlsContract";
import NurseRaidArtifact from "./maidcoin/artifacts/contracts/NurseRaid.sol/NurseRaid.json";
import { NurseRaid } from "./maidcoin/typechain";
import MaidCoinContract from "./MaidCoinContract";
import MaidsContract from "./MaidsContract";
import ERC721Contract from "./standard/ERC721Contract";
import SushiGirlsContract from "./SushiGirlsContract";

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
            "ChangeMaidEfficacy",
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
        entranceFees: BigNumberish[],
        nurseParts: BigNumberish[],
        maxRewardCounts: BigNumberish[],
        durations: BigNumberish[],
        endBlocks: BigNumberish[],
    ) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.create(entranceFees, nurseParts, maxRewardCounts, durations, endBlocks);
    }

    public async enter(raidId: number, maids?: string, maidId?: number) {

        if (maids === undefined) {
            maids = constants.AddressZero;
        }

        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet.loadAddress();
        if (contract !== undefined && owner !== undefined) {

            const raid = await this.getRaid(raidId);

            let supporterContract: undefined | ERC721Contract<any>;
            if (maids === MaidsContract.address) {
                supporterContract = MaidsContract;
            } else if (maids === LingerieGirlsContract.address) {
                supporterContract = LingerieGirlsContract;
            } else if (maids === SushiGirlsContract.address) {
                supporterContract = SushiGirlsContract;
            }

            if (
                (await MaidCoinContract.allowance(owner, this.address)).lt(raid.entranceFee) ||
                (
                    supporterContract !== undefined &&
                    await supporterContract.isApprovedForAll(owner, this.address) !== true
                )
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

                const maidSigned = supporterContract === undefined ? { v: 0, r: "0", s: "0" } : await Wallet.signERC721PermitAll(

                    await supporterContract.getName(),
                    "1",
                    supporterContract.address,

                    this.address,
                    await supporterContract.getNonceForAll(owner),
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

    public async exit(raidIds: number[]) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.exit(raidIds);
    }
}

export default new NurseRaidContract();
