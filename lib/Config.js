"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secure = require("../secure.json");
const INFURA_ID = secure.infuraId;
const ALCHEMY_KEY = secure.alchemyKey;
exports.default = {
    chainId: 3,
    blockTimeSecond: 30,
    infuraId: INFURA_ID,
    endpoint: `wss://ropsten.infura.io/ws/v3/${INFURA_ID}`,
    contracts: {
        LPToken: "0xF43df1bC8DD096F5f9dF1fB4d676D2ab38592020",
        Sushi: "0x81db9c598b3ebbdc92426422fc0a1d06e77195ec",
        MaidCoin: "0x731B69a9c8DFE1d8b9399Cf2421d34E25978C798",
        MaidCafe: "0x6F7D1780A845Bf6a856F802c8F852b5Ba5963070",
        TheMaster: "0xFD298a1F884d00D228e8dEDC135b99d9d54747a5",
        Maids: "0x38235A9DD7A51127dfC8731ED9fe621947Bc4D9B",
        MasterCoin: "0xc2ad79aAfB6AF0085531E61596Bf2fc530A8Af1a",
        NursePart: "0x525d888d146E125fadEB03255c39CF372806f62a",
        CloneNurses: "0x70e490242ADbE2407869a8A9C9d65C53c4e5dC18",
        NurseRaid: "0xaFcFfC9409DcFe65e08704dB98172FDaF63368bB",
        SushiGirls: "0x9fF326fecc05A5560Eea1A66C6c62a93a64afaFb",
        LingerieGirls: "0xf35f860762540929B3157765B82E6616664f7e97",
    },
};
//# sourceMappingURL=Config.js.map