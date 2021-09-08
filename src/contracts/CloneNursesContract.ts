import { BigNumber, BigNumberish } from "ethers";
import Config from "../Config";
import Wallet from "../ethereum/Wallet";
import CloneNursesArtifact from "./artifacts/contracts/CloneNurses.sol/CloneNurses.json";
import NursePartContract from "./NursePartContract";
import ERC721EnumerableContract from "./standard/ERC721EnumerableContract";
import { CloneNurses } from "./typechain";

interface NurseType {
    partCount: number;
    destroyReturn: BigNumber;
    power: number;
}

interface NurseInfo {
    nurseType: number;
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
        partCount: BigNumberish,
        destroyReturn: BigNumber,
        power: BigNumberish
    ) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.addNurseType(partCount, destroyReturn, power);
    }

    public async getNurseType(nurseType: number): Promise<NurseType> {
        const [partCount, destroyReturn, power] = await this.contract.nurseTypes(nurseType);
        return {
            partCount: partCount.toNumber(),
            destroyReturn,
            power: power.toNumber(),
        };
    }

    public async ownerOf(nurseId: number): Promise<string> {
        return await this.contract.ownerOf(nurseId);
    }

    public async getNurse(nurseId: BigNumberish): Promise<NurseInfo> {
        const nurseType = await this.contract.nurses(nurseId);
        return {
            nurseType: nurseType.toNumber(),
        };
    }

    public async getSupportedPower(nurseId: number): Promise<BigNumber> {
        return await this.contract.supportedPower(nurseId);
    }

    public async getSupportingTo(supporter: string): Promise<BigNumber> {
        return await this.contract.supportingTo(supporter);
    }

    public async getPendigReward(nurseId: BigNumberish): Promise<BigNumber> {
        return await this.contract.pendingReward(nurseId);
    }

    public async assemble(nurseType: number) {

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
                    nurseType, deadline,
                    nursePartSigned.v, nursePartSigned.r, nursePartSigned.s,
                );
            }

            else {
                await contract.assemble(nurseType);
            }
        }
    }

    public async claim(nurseId: BigNumberish) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.claim(nurseId);
    }
}

export default new CloneNursesContract();