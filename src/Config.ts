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

        MaidCoin: "0xBFE99524A68DBa35C092733aD4d2F3924cf355a6",
        MaidCafe: "0xD7C87cC885170a2F8b57df41eEC4Bb8e30B03A4A",
        TheMaster: "0xaA14f1118B7799976D6B7b9a9443315fEa634C10",
        Maids: "0xBF9749052d98192672fcF710e77d6C81893d69b7",
        MasterCoin: "0x9d8a6A6B5430A2e5B2b1Bf538b5d5E43eE2439dF",
        NursePart: "0x22a9edfAe63303CA9cC6536880204b831aF916a9",
        CloneNurses: "0x94c5783AFA16e8a830b5084683D1c23b9EbFA339",
        NurseRaid: "0xCA10c109684db65Ced13B09598652558c1056a0C",

        SushiGirls: "0x9fF326fecc05A5560Eea1A66C6c62a93a64afaFb",
        LingerieGirls: "0xf35f860762540929B3157765B82E6616664f7e97",
    },
};
