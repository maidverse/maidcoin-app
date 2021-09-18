"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const MaidsContractSelector_1 = __importDefault(require("../MaidsContractSelector"));
const StaticDataManager_1 = __importDefault(require("../StaticDataManager"));
const Contract_1 = __importDefault(require("./Contract"));
const NurseRaid_json_1 = __importDefault(require("./maidcoin/artifacts/contracts/NurseRaid.sol/NurseRaid.json"));
const MaidCoinContract_1 = __importDefault(require("./MaidCoinContract"));
class NurseRaidContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.NurseRaid, NurseRaid_json_1.default.abi, [
            "Create",
            "Enter",
            "Exit",
            "ChangeMaidEfficacy",
        ]);
    }
    async getChallenger(raidId, owner) {
        const [enterBlock, maids, maidId] = await this.contract.challengers(raidId, owner);
        return {
            enterBlock: enterBlock.toNumber(),
            maids,
            maidId,
        };
    }
    async powerOfMaids(maids, maidId) {
        return (await this.contract.powerOfMaids(maids, maidId)).toNumber();
    }
    async checkDone(raidId) {
        const contract = await this.getWalletContract();
        return await contract?.checkDone(raidId);
    }
    async create(entranceFees, nurseParts, maxRewardCounts, durations, endBlocks) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.create(entranceFees, nurseParts, maxRewardCounts, durations, endBlocks);
    }
    async enter(raidId, maids, maidId) {
        if (maids === undefined) {
            maids = ethers_1.constants.AddressZero;
        }
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            const raid = StaticDataManager_1.default.getRaid(raidId);
            let supporterContract = MaidsContractSelector_1.default.addressToContract(maids);
            if ((await MaidCoinContract_1.default.allowance(owner, this.address)).lt(raid.entranceFee) ||
                (supporterContract !== undefined &&
                    await supporterContract.isApprovedForAll(owner, this.address) !== true)) {
                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const maidCoinSigned = await Wallet_1.default.signERC20Permit(await MaidCoinContract_1.default.getName(), "1", MaidCoinContract_1.default.address, this.address, ethers_1.constants.MaxUint256, await MaidCoinContract_1.default.getNonce(owner), deadline);
                const maidSigned = supporterContract === undefined ? {
                    v: 28,
                    r: "0x38a8ea09bd72d5ba58499a649cbdc6b22daf077c0efb731b2e9db84ca110666f",
                    s: "0x7543d5ccd7b45730f239845830ce6b80e10d766eb13c36edc128f4ebc90aac45",
                } : await Wallet_1.default.signERC721PermitAll(await supporterContract.getName(), "1", supporterContract.address, this.address, await supporterContract.getNonceForAll(owner), deadline);
                await contract.enterWithPermitAll(raidId, maids, maidId === undefined ? ethers_1.constants.MaxUint256 : maidId, deadline, maidCoinSigned.v, maidCoinSigned.r, maidCoinSigned.s, maidSigned.v, maidSigned.r, maidSigned.s);
            }
            else {
                await contract.enter(raidId, maids, maidId === undefined ? ethers_1.constants.MaxUint256 : maidId);
            }
        }
    }
    async exit(raidIds) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.exit(raidIds);
    }
}
exports.default = new NurseRaidContract();
//# sourceMappingURL=NurseRaidContract.js.map