"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const NurseRaid_json_1 = __importDefault(require("./maidcoin/artifacts/contracts/NurseRaid.sol/NurseRaid.json"));
const Contract_1 = __importDefault(require("./Contract"));
const MaidCoinContract_1 = __importDefault(require("./MaidCoinContract"));
const MaidsContract_1 = __importDefault(require("./MaidsContract"));
class NurseRaidContract extends Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.NurseRaid, NurseRaid_json_1.default.abi, [
            "Create",
            "Enter",
            "Exit",
            "ChangeMaidEfficacy",
        ]);
    }
    async getRaidCount() {
        return await this.contract.raidCount();
    }
    async getRaid(raidId) {
        const [entranceFee, nursePart, maxRewardCount, duration, endBlock] = await this.contract.raids(raidId);
        return {
            entranceFee,
            nursePart: nursePart.toNumber(),
            maxRewardCount: maxRewardCount.toNumber(),
            duration: duration.toNumber(),
            endBlock: endBlock.toNumber(),
        };
    }
    async getChallenger(raidId, owner) {
        const [enterBlock, maids, maidId] = await this.contract.challengers(raidId, owner);
        return {
            enterBlock: enterBlock.toNumber(),
            maids,
            maidId,
        };
    }
    async checkDone(raidId) {
        const contract = await this.getWalletContract();
        return await contract?.checkDone(raidId);
    }
    async create(entranceFee, nursePart, maxRewardCount, duration, endBlock) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.create(entranceFee, nursePart, maxRewardCount, duration, endBlock);
    }
    async enter(raidId, maids, maidId) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            const raid = await this.getRaid(raidId);
            if ((await MaidCoinContract_1.default.allowance(owner, this.address)).lt(raid.entranceFee) ||
                await MaidsContract_1.default.isApprovedForAll(owner, this.address) !== true) {
                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const maidCoinSigned = await Wallet_1.default.signERC20Permit(await MaidCoinContract_1.default.getName(), "1", MaidCoinContract_1.default.address, this.address, ethers_1.constants.MaxUint256, await MaidCoinContract_1.default.getNonce(owner), deadline);
                const maidSigned = await Wallet_1.default.signERC721PermitAll(await MaidsContract_1.default.getName(), "1", MaidsContract_1.default.address, this.address, await MaidsContract_1.default.getNonceForAll(owner), deadline);
                await contract.enterWithPermitAll(raidId, maids, maidId === undefined ? ethers_1.constants.MaxUint256 : maidId, deadline, maidCoinSigned.v, maidCoinSigned.r, maidCoinSigned.s, maidSigned.v, maidSigned.r, maidSigned.s);
            }
            else {
                await contract.enter(raidId, maids, maidId === undefined ? ethers_1.constants.MaxUint256 : maidId);
            }
        }
    }
    async exit(raidId) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.exit(raidId);
    }
}
exports.default = new NurseRaidContract();
//# sourceMappingURL=NurseRaidContract.js.map