"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSushiToken__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
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
                name: "delegator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "fromDelegate",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "toDelegate",
                type: "address",
            },
        ],
        name: "DelegateChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "delegate",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "previousBalance",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newBalance",
                type: "uint256",
            },
        ],
        name: "DelegateVotesChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [],
        name: "DELEGATION_TYPEHASH",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "DOMAIN_TYPEHASH",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
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
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
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
                name: "account",
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
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint32",
                name: "",
                type: "uint32",
            },
        ],
        name: "checkpoints",
        outputs: [
            {
                internalType: "uint32",
                name: "fromBlock",
                type: "uint32",
            },
            {
                internalType: "uint256",
                name: "votes",
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
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
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
                name: "delegatee",
                type: "address",
            },
        ],
        name: "delegate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "delegatee",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "nonce",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "expiry",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
            },
        ],
        name: "delegateBySig",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "delegator",
                type: "address",
            },
        ],
        name: "delegates",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "getCurrentVotes",
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
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "blockNumber",
                type: "uint256",
            },
        ],
        name: "getPriorVotes",
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
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
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
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
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
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "nonces",
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
                name: "",
                type: "address",
            },
        ],
        name: "numCheckpoints",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
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
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
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
                name: "sender",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
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
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b50604080518082018252600a81526929bab9b434aa37b5b2b760b11b602080830191825283518085019094526005845264535553484960d81b9084015281519192916200006191600391620000e4565b50805162000077906004906020840190620000e4565b50505060006200008c620000e060201b60201c565b600580546001600160a01b0319166001600160a01b038316908117909155604051919250906000907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350620001c7565b3390565b828054620000f2906200018a565b90600052602060002090601f01602090048101928262000116576000855562000161565b82601f106200013157805160ff191683800117855562000161565b8280016001018555821562000161579182015b828111156200016157825182559160200191906001019062000144565b506200016f92915062000173565b5090565b5b808211156200016f576000815560010162000174565b600181811c908216806200019f57607f821691505b60208210811415620001c157634e487b7160e01b600052602260045260246000fd5b50919050565b61194980620001d76000396000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c8063715018a6116100de578063a9059cbb11610097578063dd62ed3e11610071578063dd62ed3e14610397578063e7a324dc146103d0578063f1127ed8146103f7578063f2fde38b1461044e57600080fd5b8063a9059cbb1461035e578063b4b5ea5714610371578063c3cda5201461038457600080fd5b8063715018a6146102f7578063782d6fe1146102ff5780637ecebe00146103125780638da5cb5b1461033257806395d89b4114610343578063a457c2d71461034b57600080fd5b80633950935111610130578063395093511461021457806340c10f1914610227578063587cde1e1461023c5780635c19a95c146102805780636fcfff451461029357806370a08231146102ce57600080fd5b806306fdde0314610178578063095ea7b31461019657806318160ddd146101b957806320606b70146101cb57806323b872dd146101f2578063313ce56714610205575b600080fd5b610180610461565b60405161018d919061173b565b60405180910390f35b6101a96101a4366004611671565b6104f3565b604051901515815260200161018d565b6002545b60405190815260200161018d565b6101bd7f8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a86681565b6101a9610200366004611635565b61050a565b6040516012815260200161018d565b6101a9610222366004611671565b6105c0565b61023a610235366004611671565b6105f7565b005b61026861024a3660046115e7565b6001600160a01b039081166000908152600660205260409020541690565b6040516001600160a01b03909116815260200161018d565b61023a61028e3660046115e7565b610654565b6102b96102a13660046115e7565b60086020526000908152604090205463ffffffff1681565b60405163ffffffff909116815260200161018d565b6101bd6102dc3660046115e7565b6001600160a01b031660009081526020819052604090205490565b61023a610661565b6101bd61030d366004611671565b6106d5565b6101bd6103203660046115e7565b60096020526000908152604090205481565b6005546001600160a01b0316610268565b61018061093b565b6101a9610359366004611671565b61094a565b6101a961036c366004611671565b6109e5565b6101bd61037f3660046115e7565b6109f2565b61023a61039236600461169b565b610a67565b6101bd6103a5366004611602565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101bd7fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf81565b6104326104053660046116fb565b60076020908152600092835260408084209091529082529020805460019091015463ffffffff9091169082565b6040805163ffffffff909316835260208301919091520161018d565b61023a61045c3660046115e7565b610d38565b60606003805461047090611872565b80601f016020809104026020016040519081016040528092919081815260200182805461049c90611872565b80156104e95780601f106104be576101008083540402835291602001916104e9565b820191906000526020600020905b8154815290600101906020018083116104cc57829003601f168201915b5050505050905090565b6000610500338484610e23565b5060015b92915050565b6000610517848484610f47565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156105a15760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b6105b585336105b08685611836565b610e23565b506001949350505050565b3360008181526001602090815260408083206001600160a01b038716845290915281205490916105009185906105b09086906117c5565b6005546001600160a01b031633146106215760405162461bcd60e51b815260040161059890611790565b61062b828261111f565b6001600160a01b038083166000908152600660205260408120546106509216836111fe565b5050565b61065e3382611362565b50565b6005546001600160a01b0316331461068b5760405162461bcd60e51b815260040161059890611790565b6005546040516000916001600160a01b0316907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600580546001600160a01b0319169055565b60004382106107375760405162461bcd60e51b815260206004820152602860248201527f53555348493a3a6765745072696f72566f7465733a206e6f74207965742064656044820152671d195c9b5a5b995960c21b6064820152608401610598565b6001600160a01b03831660009081526008602052604090205463ffffffff1680610765576000915050610504565b6001600160a01b0384166000908152600760205260408120849161078a60018561184d565b63ffffffff908116825260208201929092526040016000205416116107f3576001600160a01b0384166000908152600760205260408120906107cd60018461184d565b63ffffffff1663ffffffff16815260200190815260200160002060010154915050610504565b6001600160a01b038416600090815260076020908152604080832083805290915290205463ffffffff1683101561082e576000915050610504565b60008061083c60018461184d565b90505b8163ffffffff168163ffffffff1611156109045760006002610861848461184d565b61086b9190611805565b610875908361184d565b6001600160a01b038816600090815260076020908152604080832063ffffffff80861685529083529281902081518083019092528054909316808252600190930154918101919091529192508714156108d8576020015194506105049350505050565b805163ffffffff168711156108ef578193506108fd565b6108fa60018361184d565b92505b505061083f565b506001600160a01b038516600090815260076020908152604080832063ffffffff9094168352929052206001015491505092915050565b60606004805461047090611872565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156109cc5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610598565b6109db33856105b08685611836565b5060019392505050565b6000610500338484610f47565b6001600160a01b03811660009081526008602052604081205463ffffffff1680610a1d576000610a60565b6001600160a01b038316600090815260076020526040812090610a4160018461184d565b63ffffffff1663ffffffff168152602001908152602001600020600101545b9392505050565b60007f8cad95687ba82c2ce50e74f7b754645e5117c3a5bec8151c0726d5857980a866610a92610461565b80519060200120610aa04690565b60408051602080820195909552808201939093526060830191909152306080808401919091528151808403909101815260a0830182528051908401207fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf60c08401526001600160a01b038b1660e084015261010083018a90526101208084018a90528251808503909101815261014084019092528151919093012061190160f01b610160830152610162820183905261018282018190529192506000906101a20160408051601f198184030181528282528051602091820120600080855291840180845281905260ff8a169284019290925260608301889052608083018790529092509060019060a0016020604051602081039080840390855afa158015610bcc573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610c3f5760405162461bcd60e51b815260206004820152602760248201527f53555348493a3a64656c656761746542795369673a20696e76616c6964207369604482015266676e617475726560c81b6064820152608401610598565b6001600160a01b0381166000908152600960205260408120805491610c63836118ad565b919050558914610cc15760405162461bcd60e51b815260206004820152602360248201527f53555348493a3a64656c656761746542795369673a20696e76616c6964206e6f6044820152626e636560e81b6064820152608401610598565b87421115610d215760405162461bcd60e51b815260206004820152602760248201527f53555348493a3a64656c656761746542795369673a207369676e617475726520604482015266195e1c1a5c995960ca1b6064820152608401610598565b610d2b818b611362565b505050505b505050505050565b6005546001600160a01b03163314610d625760405162461bcd60e51b815260040161059890611790565b6001600160a01b038116610dc75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610598565b6005546040516001600160a01b038084169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a3600580546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038316610e855760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610598565b6001600160a01b038216610ee65760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610598565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038316610fab5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610598565b6001600160a01b03821661100d5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610598565b6001600160a01b038316600090815260208190526040902054818110156110855760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610598565b61108f8282611836565b6001600160a01b0380861660009081526020819052604080822093909355908516815290812080548492906110c59084906117c5565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161111191815260200190565b60405180910390a350505050565b6001600160a01b0382166111755760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610598565b806002600082825461118791906117c5565b90915550506001600160a01b038216600090815260208190526040812080548392906111b49084906117c5565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b816001600160a01b0316836001600160a01b0316141580156112205750600081115b1561135d576001600160a01b038316156112c3576001600160a01b03831660009081526008602052604081205463ffffffff1690816112605760006112a3565b6001600160a01b03851660009081526007602052604081209061128460018561184d565b63ffffffff1663ffffffff168152602001908152602001600020600101545b905060006112b182856113e1565b90506112bf868484846113ed565b5050505b6001600160a01b0382161561135d576001600160a01b03821660009081526008602052604081205463ffffffff1690816112fe576000611341565b6001600160a01b03841660009081526007602052604081209061132260018561184d565b63ffffffff1663ffffffff168152602001908152602001600020600101545b9050600061134f828561158f565b9050610d30858484846113ed565b505050565b6001600160a01b038281166000818152600660208181526040808420805485845282862054949093528787166001600160a01b03198416811790915590519190951694919391928592917f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f9190a46113db8284836111fe565b50505050565b6000610a608284611836565b6000611411436040518060600160405280603581526020016118df6035913961159b565b905060008463ffffffff1611801561146b57506001600160a01b038516600090815260076020526040812063ffffffff83169161144f60018861184d565b63ffffffff908116825260208201929092526040016000205416145b156114b4576001600160a01b0385166000908152600760205260408120839161149560018861184d565b63ffffffff168152602081019190915260400160002060010155611544565b60408051808201825263ffffffff838116825260208083018681526001600160a01b038a166000908152600783528581208a851682529092529390209151825463ffffffff1916911617815590516001918201556115139085906117dd565b6001600160a01b0386166000908152600860205260409020805463ffffffff191663ffffffff929092169190911790555b60408051848152602081018490526001600160a01b038716917fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724910160405180910390a25050505050565b6000610a6082846117c5565b60008164010000000084106115c35760405162461bcd60e51b8152600401610598919061173b565b509192915050565b80356001600160a01b03811681146115e257600080fd5b919050565b6000602082840312156115f957600080fd5b610a60826115cb565b6000806040838503121561161557600080fd5b61161e836115cb565b915061162c602084016115cb565b90509250929050565b60008060006060848603121561164a57600080fd5b611653846115cb565b9250611661602085016115cb565b9150604084013590509250925092565b6000806040838503121561168457600080fd5b61168d836115cb565b946020939093013593505050565b60008060008060008060c087890312156116b457600080fd5b6116bd876115cb565b95506020870135945060408701359350606087013560ff811681146116e157600080fd5b9598949750929560808101359460a0909101359350915050565b6000806040838503121561170e57600080fd5b611717836115cb565b9150602083013563ffffffff8116811461173057600080fd5b809150509250929050565b600060208083528351808285015260005b818110156117685785810183015185820160400152820161174c565b8181111561177a576000604083870101525b50601f01601f1916929092016040019392505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600082198211156117d8576117d86118c8565b500190565b600063ffffffff8083168185168083038211156117fc576117fc6118c8565b01949350505050565b600063ffffffff8084168061182a57634e487b7160e01b600052601260045260246000fd5b92169190910492915050565b600082821015611848576118486118c8565b500390565b600063ffffffff8381169083168181101561186a5761186a6118c8565b039392505050565b600181811c9082168061188657607f821691505b602082108114156118a757634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156118c1576118c16118c8565b5060010190565b634e487b7160e01b600052601160045260246000fdfe53555348493a3a5f7772697465436865636b706f696e743a20626c6f636b206e756d62657220657863656564732033322062697473a26469706673582212204e6b89cc0c0f408c02a95667c2d29d7ade16e54ca09e2923d95d73848af5650a64736f6c63430008050033";
class TestSushiToken__factory extends ethers_1.ContractFactory {
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
exports.TestSushiToken__factory = TestSushiToken__factory;
TestSushiToken__factory.bytecode = _bytecode;
TestSushiToken__factory.abi = _abi;
//# sourceMappingURL=TestSushiToken__factory.js.map