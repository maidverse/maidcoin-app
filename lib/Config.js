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
        Sushi: "0xcd280c22F70d6f58B34a1cCbd41780979BBC2F3B",
        MaidCoin: "0x356Dc3fE14028D63c5384CD5c45B99fD67534Df1",
        MaidCafe: "0x1269928086142754f11807E45C5046591eE61ddE",
        TheMaster: "0xe01974C8538a13E6158464FFA0d13aec35968bd3",
        Maids: "0x7845b05a896Cfd4Ce32eC27631B176D59425C063",
        MasterCoin: "0x57A57cc911f8cE5e1F709A8183db5A26c51CCe89",
        NursePart: "0x3Ef1374Edc0aD594657eFB94D6Fc31993FcE1aEf",
        NurseRaid: "0xFcbceed7D1B0dEc07cE561F217290a1BD0D16d3b",
        CloneNurses: "0xCCf5FAe6968ae71637225C783847eA07c1283e98",
        SushiGirls: "0xd48ec06ee1e1016c159415262A2dFa233E325C2F",
        LingerieGirls: "0xB555cA9C88CeB8ece57b9223AA6D7407dD273656",
    },
};
//# sourceMappingURL=Config.js.map