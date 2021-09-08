"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secure = require("../secure.json");
const INFURA_ID = secure.infuraId;
exports.default = {
    chainId: 42,
    blockTimeSecond: 4,
    infuraId: INFURA_ID,
    endpoint: `wss://kovan.infura.io/ws/v3/${INFURA_ID}`,
    contracts: {
        LPToken: "0x56ac87553c4dBcd877cA7E4fba54959f091CaEdE",
        MaidCoin: "0x16D882cA92BF09b06c7f4fd8165a27113663397b",
        Sushi: "0xcd280c22F70d6f58B34a1cCbd41780979BBC2F3B",
        TheMaster: "0x4aaA8537123F8B5f0E00D3111a6dd3a0C7911eF3",
        Maids: "0x92FfBCc641a4C91145F0C7017087Dd20241FCBA8",
        MasterCoin: "0xD7FFa70e0202B759ff693f2526269AF3D28058Fb",
        NursePart: "0xf2571FA69Db5701a467Ff562e7E8ADd0f51d6015",
        NurseRaid: "0xd2305b778ED34721B6B84A5d50354c34E0894124",
        CloneNurses: "0xF11Da614CB86CAEAcD1140D00426a67093298f44",
        SushiGirls: "0xd48ec06ee1e1016c159415262A2dFa233E325C2F",
    },
};
//# sourceMappingURL=Config.js.map