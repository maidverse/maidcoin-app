const secure = require("../secure.json");
const INFURA_ID = secure.infuraId;

export default {

    // Mainnet
    //chainId: 1,
    //blockTimeSecond: 15,

    // Kovan
    chainId: 42,
    blockTimeSecond: 4,

    infuraId: INFURA_ID,

    // Mainnet
    //endpoint: `wss://mainnet.infura.io/ws/v3/${INFURA_ID}`,

    // Kovan
    endpoint: `wss://kovan.infura.io/ws/v3/${INFURA_ID}`,

    contracts: {
        // Kovan
        LPToken: "0x56ac87553c4dBcd877cA7E4fba54959f091CaEdE",
        MaidCoin: "0x6AE9F1044e16ffc04CB14Eb678D3BB44DFcB869C",
        TheMaster: "0x0D6B37d42aaD236f3a74de033c75bca307B8714e",
        Maid: "0x155F42236410b6d71c19C313Ce31F7A67c1A66c7",
        MasterCoin: "0x88a9040Eb542754996Df2A52a803bEBb24F701f2",
        NursePart: "0x67d7a6e0CA121A64540B2c6fc28c0AD25cc73c94",
        NurseRaid: "0xD1729B09eE55DeE3757695FEe2E591e31aed90B2",
        CloneNurse: "0x63A81967B7217201852A07897Be67035a638787E",
        SushiGirl: "0x25CFD98F9b7c8a7DFc782f046d4e3A3DecF0E4E1",
    },
};
