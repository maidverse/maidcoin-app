"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WETH__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "src",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "guy",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "dst",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "Deposit",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "src",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "dst",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "src",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "Withdrawal",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "guy",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "deposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "dst",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "src",
                type: "address",
            },
            {
                internalType: "address",
                name: "dst",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "wad",
                type: "uint256",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];
const _bytecode = "0x60c0604052600d60808190526c2bb930b83832b21022ba3432b960991b60a090815261002e916000919061007a565b50604080518082019091526004808252630ae8aa8960e31b602090920191825261005a9160019161007a565b506002805460ff1916601217905534801561007457600080fd5b5061014e565b82805461008690610113565b90600052602060002090601f0160209004810192826100a857600085556100ee565b82601f106100c157805160ff19168380011785556100ee565b828001600101855582156100ee579182015b828111156100ee5782518255916020019190600101906100d3565b506100fa9291506100fe565b5090565b5b808211156100fa57600081556001016100ff565b600181811c9082168061012757607f821691505b6020821081141561014857634e487b7160e01b600052602260045260246000fd5b50919050565b6107ce8061015d6000396000f3fe6080604052600436106100a05760003560e01c8063313ce56711610064578063313ce5671461016c57806370a082311461019857806395d89b41146101c5578063a9059cbb146101da578063d0e30db0146101fa578063dd62ed3e1461020257600080fd5b806306fdde03146100b4578063095ea7b3146100df57806318160ddd1461010f57806323b872dd1461012c5780632e1a7d4d1461014c57600080fd5b366100af576100ad61023a565b005b600080fd5b3480156100c057600080fd5b506100c9610295565b6040516100d691906106c3565b60405180910390f35b3480156100eb57600080fd5b506100ff6100fa366004610680565b610323565b60405190151581526020016100d6565b34801561011b57600080fd5b50475b6040519081526020016100d6565b34801561013857600080fd5b506100ff610147366004610644565b61038f565b34801561015857600080fd5b506100ad6101673660046106aa565b610513565b34801561017857600080fd5b506002546101869060ff1681565b60405160ff90911681526020016100d6565b3480156101a457600080fd5b5061011e6101b33660046105f6565b60036020526000908152604090205481565b3480156101d157600080fd5b506100c96105b9565b3480156101e657600080fd5b506100ff6101f5366004610680565b6105c6565b6100ad61023a565b34801561020e57600080fd5b5061011e61021d366004610611565b600460209081526000928352604080842090915290825290205481565b3360009081526003602052604081208054349290610259908490610718565b909155505060405134815233907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a2565b600080546102a290610747565b80601f01602080910402602001604051908101604052809291908181526020018280546102ce90610747565b801561031b5780601f106102f05761010080835404028352916020019161031b565b820191906000526020600020905b8154815290600101906020018083116102fe57829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061037e9086815260200190565b60405180910390a350600192915050565b6001600160a01b0383166000908152600360205260408120548211156103b457600080fd5b6001600160a01b03841633148015906103f257506001600160a01b038416600090815260046020908152604080832033845290915290205460001914155b15610460576001600160a01b038416600090815260046020908152604080832033845290915290205482111561042757600080fd5b6001600160a01b03841660009081526004602090815260408083203384529091528120805484929061045a908490610730565b90915550505b6001600160a01b03841660009081526003602052604081208054849290610488908490610730565b90915550506001600160a01b038316600090815260036020526040812080548492906104b5908490610718565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161050191815260200190565b60405180910390a35060019392505050565b3360009081526003602052604090205481111561052f57600080fd5b336000908152600360205260408120805483929061054e908490610730565b9091555050604051339082156108fc029083906000818181858888f19350505050158015610580573d6000803e3d6000fd5b5060405181815233907f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b659060200160405180910390a250565b600180546102a290610747565b60006105d333848461038f565b9392505050565b80356001600160a01b03811681146105f157600080fd5b919050565b60006020828403121561060857600080fd5b6105d3826105da565b6000806040838503121561062457600080fd5b61062d836105da565b915061063b602084016105da565b90509250929050565b60008060006060848603121561065957600080fd5b610662846105da565b9250610670602085016105da565b9150604084013590509250925092565b6000806040838503121561069357600080fd5b61069c836105da565b946020939093013593505050565b6000602082840312156106bc57600080fd5b5035919050565b600060208083528351808285015260005b818110156106f0578581018301518582016040015282016106d4565b81811115610702576000604083870101525b50601f01601f1916929092016040019392505050565b6000821982111561072b5761072b610782565b500190565b60008282101561074257610742610782565b500390565b600181811c9082168061075b57607f821691505b6020821081141561077c57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fdfea264697066735822122002adca8c44aa4ecd945a69bdffe4696863f5c9084a98cf08043d97b8db0d324f64736f6c63430008050033";
class WETH__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.WETH__factory = WETH__factory;
WETH__factory.bytecode = _bytecode;
WETH__factory.abi = _abi;
//# sourceMappingURL=WETH__factory.js.map