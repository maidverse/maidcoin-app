"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INFURA_ID = "5a8a61181115416ebffd2ec0fef74592";
exports.default = {
    chainId: 42,
    infuraId: INFURA_ID,
    maidCount: 30,
    endpoint: `wss://kovan.infura.io/ws/v3/${INFURA_ID}`,
    contracts: {
        LPToken: "0x56ac87553c4dBcd877cA7E4fba54959f091CaEdE",
        MaidCoin: "0x2E54313B249E442Da4eFb35C544D2a5550Ae7027",
        TheMaster: "0xd716BA99491cBCd4f96FbE97C9f671995e178a05",
        Maid: "0xA320f1cE18B93906b02F86f9fb38694F96019074",
        MasterCoin: "0x0dD7F42557eD229fdB4731B91907C5d24fd6CF61",
        NursePart: "0x48dfa4DBD96853ebAF7Dc1823e9820dBdC17C56f",
        NurseRaid: "0x412f49aF7fc6f35728Aec04757866cDd6460d386",
        CloneNurse: "0xC8D796d665AAc8C3E4225E6aa5316243e3EF5c6c",
    },
};
//# sourceMappingURL=Config.js.map