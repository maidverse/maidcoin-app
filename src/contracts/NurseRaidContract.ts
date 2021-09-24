import { BigNumber, BigNumberish, constants } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import MaidsContractSelector from "../MaidsContractSelector";
import StaticDataManager from "../StaticDataManager";
import Contract from "./Contract";
import NurseRaidArtifact from "./maidcoin/artifacts/contracts/NurseRaid.sol/NurseRaid.json";
import { NurseRaid } from "./maidcoin/typechain";
import MaidCoinContract from "./MaidCoinContract";

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

    public async getChallenger(raidId: number, owner: string): Promise<ChallengerInfo> {
        const [enterBlock, maids, maidId] = await this.contract.challengers(raidId, owner);
        return {
            enterBlock: enterBlock.toNumber(),
            maids,
            maidId,
        };
    }

    public async powerOfMaids(maids: string, maidId: BigNumberish): Promise<number> {
        return (await this.contract.powerOfMaids(maids, maidId)).toNumber();
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

            const raid = StaticDataManager.getRaid(raidId);

            let supporterContract = MaidsContractSelector.addressToContract(maids);
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
                const maidSigned = supporterContract === undefined ? {
                    v: 28,
                    r: "0x38a8ea09bd72d5ba58499a649cbdc6b22daf077c0efb731b2e9db84ca110666f",
                    s: "0x7543d5ccd7b45730f239845830ce6b80e10d766eb13c36edc128f4ebc90aac45",
                } : await Wallet.signERC721PermitAll(

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
