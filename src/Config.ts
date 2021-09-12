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

        MaidCoin: "0x3C301DfEE7f3B1728810CE66553aCF10A07D6573",
        MaidCafe: "0x49E7A1E78E277231FE8cbb92E309B7538CB6e3AA",
        TheMaster: "0x87EdFB922dca6377aE09A5C01aB24D737edd13C7",
        Maids: "0x888bfebDc8e96D442114E0B1DB7a89d3d29b5212",
        MasterCoin: "0x60D6a6b75dF23C8592e30221Fb1100a0b196690a",
        NursePart: "0xC479BB1F83F29EC317D925d6f06246c0b40D6F3F",
        NurseRaid: "0xD2CCF0C5b867D98b8B78B5f7912954Da80957eFa",
        CloneNurses: "0x2d954644Bd50b8cc85EEa557d18C0Ee523f6CfC5",

        SushiGirls: "0xd48ec06ee1e1016c159415262A2dFa233E325C2F",
        LingerieGirls: "0xB555cA9C88CeB8ece57b9223AA6D7407dD273656",
    },
};
