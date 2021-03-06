"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const CloneNurses_json_1 = __importDefault(require("./maidcoin/artifacts/contracts/CloneNurses.sol/CloneNurses.json"));
const NursePartContract_1 = __importDefault(require("./NursePartContract"));
const ERC721EnumerableContract_1 = __importDefault(require("./standard/ERC721EnumerableContract"));
class CloneNursesContract extends ERC721EnumerableContract_1.default {
    constructor() {
        super(Config_1.default.contracts.CloneNurses, CloneNurses_json_1.default.abi, [
            "Claim",
            "SupportTo",
            "ChangeSupportingRoute",
            "ChangeSupportedPower",
            "TransferSupportingRewards",
        ]);
    }
    async getNurseTypeCount() {
        return await this.contract.nurseTypeCount();
    }
    async addNurseType(partCounts, destroyReturns, powers, lifetimes) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.addNurseType(partCounts, destroyReturns, powers, lifetimes);
    }
    async ownerOf(nurseId) {
        return await this.contract.ownerOf(nurseId);
    }
    async getNurse(nurseId) {
        const [nurseType, endBlock] = await this.contract.nurses(nurseId);
        return {
            nurseType: nurseType.toNumber(),
            endBlock: endBlock.toNumber(),
        };
    }
    async getSupportedPower(nurseId) {
        return await this.contract.supportedPower(nurseId);
    }
    async findSupportingTo(supporter) {
        const [owner, supportingTo] = await this.contract.findSupportingTo(supporter);
        return {
            owner,
            supportingTo: supportingTo.toNumber(),
        };
    }
    async getPendigReward(nurseId) {
        return await this.contract.pendingReward(nurseId);
    }
    async assemble(nurseType, partCount) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            if (await NursePartContract_1.default.isApprovedForAll(owner, this.address) !== true) {
                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const nursePartSigned = await Wallet_1.default.signERC1155Permit(await NursePartContract_1.default.getName(), "1", NursePartContract_1.default.address, this.address, await NursePartContract_1.default.getNonce(owner), deadline);
                await contract.assembleWithPermit(nurseType, partCount, deadline, nursePartSigned.v, nursePartSigned.r, nursePartSigned.s);
            }
            else {
                await contract.assemble(nurseType, partCount);
            }
        }
    }
    async elongateLifetime(ids, parts) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.elongateLifetime(ids, parts);
    }
    async claim(nurseIds) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.claim(nurseIds);
    }
    async destroy(nurseIds, toIds) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.destroy(nurseIds, toIds);
    }
}
exports.default = new CloneNursesContract();
//# sourceMappingURL=CloneNursesContract.js.map