const secure = require("../secure.json");
const INFURA_ID = secure.infuraId;
const ALCHEMY_KEY = secure.alchemyKey;

export default {

    // Mainnet
    //chainId: 1,
    //blockTimeSecond: 15,

    // Ropsten
    chainId: 3,
    blockTimeSecond: 30,

    infuraId: INFURA_ID,

    // Mainnet
    //endpoint: `wss://mainnet.infura.io/ws/v3/${INFURA_ID}`,

    // Ropsten
    endpoint: `wss://ropsten.infura.io/ws/v3/${INFURA_ID}`,

    contracts: {

        // Mainnet

        // Ropsten
        LPToken: "0xF43df1bC8DD096F5f9dF1fB4d676D2ab38592020",
        Sushi: "0x81db9c598b3ebbdc92426422fc0a1d06e77195ec",

        MaidCoin: "0xFb6A8713Df021c7FFf8ac1bA3dF7e56dDdBc555B",
        MaidCafe: "0x1eC7EFACf8DBC651F484e5eD6c2D656eA2269273",
        TheMaster: "0xc8DA549E25Fd6d067b3eec1d4c73fCeDf7e791EF",
        Maids: "0x65A8D91AD493E9f65505BaC137eD94a06A46A34a",
        MasterCoin: "0x14f5ce165e5CEf8d48d024CbCF77ABFD65a3e581",
        NursePart: "0x2282853357Dca1985B3198865B3271B8F2b833dF",
        CloneNurses: "0xb4F4c1d5Cf438D1a94752ff9Cc9413DA5A1e9711",
        NurseRaid: "0x468765383d80f19C478919D641501312bf666aE7",

        SushiGirls: "0x9fF326fecc05A5560Eea1A66C6c62a93a64afaFb",
        LingerieGirls: "0xf35f860762540929B3157765B82E6616664f7e97",
    },
};
