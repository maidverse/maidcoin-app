"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const lingeriegirls_json_1 = __importDefault(require("./json/lingeriegirls.json"));
const maids_json_1 = __importDefault(require("./json/maids.json"));
const nurseparts_json_1 = __importDefault(require("./json/nurseparts.json"));
const nursetypes_json_1 = __importDefault(require("./json/nursetypes.json"));
const raids_json_1 = __importDefault(require("./json/raids.json"));
const sushigirls_json_1 = __importDefault(require("./json/sushigirls.json"));
class StaticDataManager {
    getMaid(id) {
        const raw = maids_json_1.default[id];
        return {
            originPower: raw.attributes.find((a) => a.trait_type === "Power").value,
            name: raw.name,
        };
    }
    getLingerieGirl(id) {
        const raw = lingeriegirls_json_1.default[id];
        return {
            originPower: raw.attributes.find((a) => a.trait_type === "Power").value,
            name: raw.name,
        };
    }
    getSushiGirl(id) {
        const raw = sushigirls_json_1.default[id];
        return {
            originPower: raw.attributes.find((a) => a.trait_type === "Power").value,
            name: raw.name,
        };
    }
    getNursePart(part) {
        return nurseparts_json_1.default[part];
    }
    getNurseType(type) {
        const raw = nursetypes_json_1.default[type];
        return {
            name: raw.name,
            partCount: raw.partCount,
            destroyReturn: ethers_1.utils.parseEther(String(raw.destroyReturn)),
            power: raw.power,
            lifetime: raw.lifetime,
        };
    }
    get raidCount() {
        return Object.keys(raids_json_1.default).length;
    }
    getRaid(id) {
        const raw = raids_json_1.default[id];
        return {
            entranceFee: ethers_1.utils.parseEther(String(raw.entranceFee)),
            nursePart: raw.nursePart,
            maxRewardCount: raw.maxRewardCount,
            duration: raw.duration,
            endBlock: raw.endBlock,
        };
    }
}
exports.default = new StaticDataManager();
//# sourceMappingURL=StaticDataManager.js.map