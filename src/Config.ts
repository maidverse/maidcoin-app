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

        // Mainnet

        // Kovan
        LPToken: "0x56ac87553c4dBcd877cA7E4fba54959f091CaEdE",
        Sushi: "0xcd280c22F70d6f58B34a1cCbd41780979BBC2F3B",

        MaidCoin: "0xDC5Fd110bDD46A31387b6336290AdB40F9B448F5",
        MaidCafe: "0xFf09Dd69Df8B1F0268760A12EaBFe220F1064776",
        TheMaster: "0xE3d97175c1F53Ed04596c5DEA7aAF947a895e091",
        Maids: "0xB0Dc991004A5Ff10D45b85500758D21559E498DA",
        MasterCoin: "0x0fd47D0Fd94A959Ba398043746F3b6A9F963000C",
        NursePart: "0xF552878812da76A4add84A7849612dC06852A1d3",
        NurseRaid: "0x070350A5C72FA3f71e8C51df97C6fb673fb0f71f",
        CloneNurses: "0x5bCAbCb4e9a9112376d45Ea8c61981b7AAa884F0",

        SushiGirls: "0xd48ec06ee1e1016c159415262A2dFa233E325C2F",
        LingerieGirls: "0xB555cA9C88CeB8ece57b9223AA6D7407dD273656",
    },
};
