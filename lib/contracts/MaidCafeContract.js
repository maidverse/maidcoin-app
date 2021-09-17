"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const MaidCafe_json_1 = __importDefault(require("./maidcoin/artifacts/contracts/MaidCafe.sol/MaidCafe.json"));
const MaidCoinContract_1 = __importDefault(require("./MaidCoinContract"));
const ERC20Contract_1 = __importDefault(require("./standard/ERC20Contract"));
class MaidCafeContract extends ERC20Contract_1.default {
    constructor() {
        super(Config_1.default.contracts.MaidCafe, MaidCafe_json_1.default.abi, [
            "Enter",
            "Leave",
        ]);
    }
    async enter(amount) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            if ((await MaidCoinContract_1.default.allowance(owner, this.address)).lt(amount)) {
                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const signed = await Wallet_1.default.signERC20Permit(await MaidCoinContract_1.default.getName(), "1", MaidCoinContract_1.default.address, this.address, amount, await MaidCoinContract_1.default.getNonce(owner), deadline);
                await contract.enterWithPermit(amount, deadline, signed.v, signed.r, signed.s);
            }
            else {
                await contract.enter(amount);
            }
        }
    }
    async leave(share) {
        const contract = await this.connectAndGetWalletContract();
        await contract?.leave(share);
    }
}
exports.default = new MaidCafeContract();
//# sourceMappingURL=MaidCafeContract.js.map