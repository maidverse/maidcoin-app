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

        MaidCoin: "0xeC51621aC4Bb7Cf45EF540965f593263679740f6",
        MaidCafe: "0x667FB03E17D7Ef0349Ca7f994A7893C15956AF05",
        TheMaster: "0x2F0323e715878638d3EC843f99B7E0317d1783E3",
        Maids: "0x9618570D53cB287DC42ccff2D978275ac141c691",
        MasterCoin: "0x8007dF01Ef96Fd37EA1c3a8C86Ea11fFD66e46Ff",
        NursePart: "0x8EBBfa1d3FE4fd268cD5a86af6b7916960A0FD37",
        NurseRaid: "0xCc0438F654a5E74Fb8163FbBA26ED5b44A8c9179",
        CloneNurses: "0xb2d3FD3D4b23e5FB37c1eec4bf63fd948a0188fF",

        SushiGirls: "0xd48ec06ee1e1016c159415262A2dFa233E325C2F",
        LingerieGirls: "0xB555cA9C88CeB8ece57b9223AA6D7407dD273656",
    },
};
