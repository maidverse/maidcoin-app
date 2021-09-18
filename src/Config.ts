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

        MaidCoin: "0x4a13A8a1646029B9d08e6b2a1C5b1f97b78926cf",
        MaidCafe: "0xAe080415d34155eE6CfF37e1a5dFea997E3Acb1c",
        TheMaster: "0x10b8Fe9248b771eEBE46ea9eBAD7A4D59be714cE",
        Maids: "0x449E9AcEDC00dE3De74C547a130C76Aa62d75cf2",
        MasterCoin: "0x28212f2D8987fF7590eaC26384c1cE93C4F8071E",
        NursePart: "0x664Bf421C9ce702905202972145F881DB4b140ad",
        CloneNurses: "0xa59EE8162C7195DB34A81b8bee679654fDc3c37C",
        NurseRaid: "0xaCA9C5e4E2E2b8f34AC8EcafAb7F2990ec02C0dd",

        SushiGirls: "0x9fF326fecc05A5560Eea1A66C6c62a93a64afaFb",
        LingerieGirls: "0xf35f860762540929B3157765B82E6616664f7e97",
    },
};
