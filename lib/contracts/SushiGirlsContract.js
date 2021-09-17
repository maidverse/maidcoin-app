"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = __importDefault(require("../Config"));
const Wallet_1 = __importDefault(require("../ethereum/Wallet"));
const SushiGirls_json_1 = __importDefault(require("./sushigirls/artifacts/contracts/SushiGirls.sol/SushiGirls.json"));
const LPTokenContract_1 = __importDefault(require("./LPTokenContract"));
const ERC721EnumerableContract_1 = __importDefault(require("./standard/ERC721EnumerableContract"));
class SushiGirlsContract extends ERC721EnumerableContract_1.default {
    constructor() {
        super(Config_1.default.contracts.SushiGirls, SushiGirls_json_1.default.abi, [
            "ChangeLPTokenToSushiGirlPower",
            "Support",
            "Desupport",
        ]);
    }
    async getSushiGirl(id) {
        const [originPower, supportedLPTokenAmount] = await this.contract.sushiGirls(id);
        return {
            originPower: originPower.toNumber(),
            supportedLPTokenAmount,
        };
    }
    async ownerOf(id) {
        return await this.contract.ownerOf(id);
    }
    async powerOf(id) {
        return (await this.contract.powerOf(id)).toNumber();
    }
    async support(id, lpTokenAmount) {
        const contract = await this.connectAndGetWalletContract();
        const owner = await Wallet_1.default.loadAddress();
        if (contract !== undefined && owner !== undefined) {
            if ((await LPTokenContract_1.default.allowance(owner, this.address)).lt(lpTokenAmount)) {
                const deadline = Math.ceil(Date.now() / 1000) + 1000000;
                const signed = await Wallet_1.default.signERC20Permit(await LPTokenContract_1.default.getName(), "1", LPTokenContract_1.default.address, this.address, lpTokenAmount, await LPTokenContract_1.default.getNonce(owner), deadline);
                await contract.supportWithPermit(id, lpTokenAmount, deadline, signed.v, signed.r, signed.s);
            }
            else {
                await contract.support(id, lpTokenAmount);
            }
        }
    }
}
exports.default = new SushiGirlsContract();
//# sourceMappingURL=SushiGirlsContract.js.map