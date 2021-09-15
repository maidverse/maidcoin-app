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
        MaidCoin: "0xc3a7DC0D11909503aa0Ef1c7368B4EC7ac2e6E5C",
        MaidCafe: "0x40f060711b3250559762A70EdBBcc3C79Ff80Aa9",
        TheMaster: "0x25312764c5a74992b87Bf383981B6563e2090EC8",
        Maids: "0x43B1D98478F355ddb0A2c44b89EB4e886C8327f9",
        MasterCoin: "0xfcd6c88109c487a1644aDCBE9F080210606eFAA7",
        NursePart: "0xC3B6eeb2c635126D211FfE7F6598b3808c36BdfA",
        NurseRaid: "0xf72ccEFE49d2E3F966bEacd2bC38617Cc4911518",
        CloneNurses: "0xc6FE9c4A0497d993B9b52c3024D9be466A993e1b",
        SushiGirls: "0xd48ec06ee1e1016c159415262A2dFa233E325C2F",
        LingerieGirls: "0xB555cA9C88CeB8ece57b9223AA6D7407dD273656",
    },
};
//# sourceMappingURL=Config.js.map