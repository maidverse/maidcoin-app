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
    rewardPerBlock: 1,

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

        MaidCoin: "0x5EdC8b17B286205D29Ba49f5365D7e25d9cc9dd7",
        MaidCafe: "0x1EAfFeCd478660146124D83aF3Bb9C0886263eE6",
        TheMaster: "0x074Ec4ABe3684f7C634B2fBBf1dEC9B2d7981d3A",
        Maids: "0xa35CB7B37f0C8134f8D2286B4b862360936F5Da5",
        MasterCoin: "0x2d92ABb27a2DBdBb7bAABA1D4F2818cDc07974d3",
        NursePart: "0xc541ec4d0eDf27806FA491053c0C66228aE2e8eb",
        CloneNurses: "0xEDA6f6175C47bf536d672305251347172B8d7C47",
        NurseRaid: "0x093283D8f09fFA852682c1426b03ec29b5A34FcE",

        SushiGirls: "0x9fF326fecc05A5560Eea1A66C6c62a93a64afaFb",
        LingerieGirls: "0xf35f860762540929B3157765B82E6616664f7e97",
    },
};
