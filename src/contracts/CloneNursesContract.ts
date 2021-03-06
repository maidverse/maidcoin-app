import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import CloneNursesArtifact from "./maidcoin/artifacts/contracts/CloneNurses.sol/CloneNurses.json";
import { CloneNurses } from "./maidcoin/typechain";
import NursePartContract from "./NursePartContract";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";

interface NurseInfo {
    nurseType: number;
    endBlock: number;
}

class CloneNursesContract extends ERC721EnumerableContract<CloneNurses> {

    constructor() {
        super(Config.contracts.CloneNurses, CloneNursesArtifact.abi, [
            "Claim",
            "SupportTo",
            "ChangeSupportingRoute",
            "ChangeSupportedPower",
            "TransferSupportingRewards",
        ]);
    }

    public async getNurseTypeCount(): Promise<BigNumber> {
        return await this.contract.nurseTypeCount();
    }

    public async addNurseType(
        partCounts: BigNumberish[],
        destroyReturns: BigNumber[],
        powers: BigNumberish[],
        lifetimes: BigNumberish[]
    ) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.addNurseType(partCounts, destroyReturns, powers, lifetimes);
    }

    public async ownerOf(nurseId: number): Promise<string> {
        return await this.contract.ownerOf(nurseId);
    }

    public async getNurse(nurseId: BigNumberish): Promise<NurseInfo> {
        const [nurseType, endBlock] = await this.contract.nurses(nurseId);
        return {
            nurseType: nurseType.toNumber(),
            endBlock: endBlock.toNumber(),
        };
    }

    public async getSupportedPower(nurseId: number): Promise<BigNumber> {
        return await this.contract.supportedPower(nurseId);
    }

    public async findSupportingTo(supporter: string): Promise<{
        owner: string,
        supportingTo: number,
    }> {
        const [owner, supportingTo] = await this.contract.findSupportingTo(supporter);
        return {
            owner,
            supportingTo: supportingTo.toNumber(),
        }
    }

    public async getPendigReward(nurseId: BigNumberish): Promise<BigNumber> {
        return await this.contract.pendingReward(nurseId);
    }

    public async assemble(nurseType: number, partCount: number) {

        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet.loadAddress();
        if (contract !== undefined && owner !== undefined) {

            if (await NursePartContract.isApprovedForAll(owner, this.address) !== true) {
                const deadline = Math.ceil(Date.now() / 1000) + 1000000;

                const nursePartSigned = await Wallet.signERC1155Permit(

                    await NursePartContract.getName(),
                    "1",
                    NursePartContract.address,

                    this.address,
                    await NursePartContract.getNonce(owner),
                    deadline,
                );

                await contract.assembleWithPermit(
                    nurseType, partCount, deadline,
                    nursePartSigned.v, nursePartSigned.r, nursePartSigned.s,
                );
            }

            else {
                await contract.assemble(nurseType, partCount);
            }
        }
    }

    public async elongateLifetime(ids: BigNumberish[], parts: BigNumberish[]) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.elongateLifetime(ids, parts);
    }

    public async claim(nurseIds: BigNumberish[]) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.claim(nurseIds);
    }

    public async destroy(nurseIds: BigNumberish[], toIds: BigNumberish[]) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.destroy(nurseIds, toIds);
    }
}

export default new CloneNursesContract();
