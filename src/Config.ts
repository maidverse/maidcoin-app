const secure = require("../secure.json");
const INFURA_ID = secure.infuraId;
const ALCHEMY_KEY = secure.alchemyKey;

export default {

    // Mainnet
    chainId: 1,
    blockTimeSecond: 15,

    // Ropsten
    /*chainId: 3,
    blockTimeSecond: 30,*/

    startBlock: 13316000,
    rewardPerBlock: 0.333333333333333333,

    infuraId: INFURA_ID,

    // Mainnet
    endpoint: `wss://mainnet.infura.io/ws/v3/${INFURA_ID}`,

    // Ropsten
    //endpoint: `wss://ropsten.infura.io/ws/v3/${INFURA_ID}`,

    contracts: {

        // Mainnet
        LPToken: "0xc7175038323562cB68E4BbdD379E9fE65134937f",
        Sushi: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",

        MaidCoin: "0x4Af698B479D0098229DC715655c667Ceb6cd8433",
        MaidCafe: "0xD428F1050AdC29976d4339b1ec602832034dF701",
        TheMaster: "0xCD9E5C7969A4C0B4FA8726B243143381f4984337",
        Maids: "0x42ED30f2c459601A4f74Ff831B76Be64195D3dE4",
        MasterCoin: "0xc0746351f7F55a69415b280Ca6378093EA4aAFF2",
        NursePart: "0x861f8d5b601054D5109B93D3775cd71c74593f78",
        CloneNurses: "0x5eE657F5426484A777a1fC7Abd436DfDB13b1cc3",
        NurseRaid: "0x629d37B273c05597C8bEfB7B48525803B202D9Ea",

        SushiGirls: "0xEB3b418e4A4430392Cd57b1356c5B1d2205A56d9",
        LingerieGirls: "0x579a60fbc649d3398f13e0385dbe79b3ffad757c",

        // Ropsten
        /*LPToken: "0xF43df1bC8DD096F5f9dF1fB4d676D2ab38592020",
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
        LingerieGirls: "0xf35f860762540929B3157765B82E6616664f7e97",*/
    },
};
