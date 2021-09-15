"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NurseRaid__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "contract IMaidCoin",
                name: "_maidCoin",
                type: "address",
            },
            {
                internalType: "contract IMaidCafe",
                name: "_maidCafe",
                type: "address",
            },
            {
                internalType: "contract INursePart",
                name: "_nursePart",
                type: "address",
            },
            {
                internalType: "contract IRNG",
                name: "_rng",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "numerator",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "denominator",
                type: "uint256",
            },
        ],
        name: "ChangeMaidEfficacy",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "entranceFee",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "nursePart",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "maxRewardCount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "endBlock",
                type: "uint256",
            },
        ],
        name: "Create",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "challenger",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "contract IMaids",
                name: "maids",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "maidId",
                type: "uint256",
            },
        ],
        name: "Enter",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "challenger",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "Exit",
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
        inputs: [
            {
                internalType: "contract IMaids[]",
                name: "maids",
                type: "address[]",
            },
        ],
        name: "approveMaids",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "challengers",
        outputs: [
            {
                internalType: "uint256",
                name: "enterBlock",
                type: "uint256",
            },
            {
                internalType: "contract IMaids",
                name: "maids",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "maidId",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_numerator",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_denominator",
                type: "uint256",
            },
        ],
        name: "changeMaidEfficacy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
        ],
        name: "changeRNG",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "checkDone",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "entranceFees",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "_nurseParts",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "maxRewardCounts",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "durations",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "endBlocks",
                type: "uint256[]",
            },
        ],
        name: "create",
        outputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IMaids[]",
                name: "maids",
                type: "address[]",
            },
        ],
        name: "disapproveMaids",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "contract IMaids",
                name: "maids",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "maidId",
                type: "uint256",
            },
        ],
        name: "enter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "contract IMaids",
                name: "maids",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "maidId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "v1",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "r1",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "s1",
                type: "bytes32",
            },
            {
                internalType: "uint8",
                name: "v2",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "r2",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "s2",
                type: "bytes32",
            },
        ],
        name: "enterWithPermit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "contract IMaids",
                name: "maids",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "maidId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "v1",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "r1",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "s1",
                type: "bytes32",
            },
            {
                internalType: "uint8",
                name: "v2",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "r2",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "s2",
                type: "bytes32",
            },
        ],
        name: "enterWithPermitAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
        ],
        name: "exit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "contract IMaids",
                name: "",
                type: "address",
            },
        ],
        name: "isMaidsApproved",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maidCafe",
        outputs: [
            {
                internalType: "contract IMaidCafe",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maidCoin",
        outputs: [
            {
                internalType: "contract IMaidCoin",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "maidEfficacy",
        outputs: [
            {
                internalType: "uint256",
                name: "numerator",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "denominator",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "nursePart",
        outputs: [
            {
                internalType: "contract INursePart",
                name: "",
                type: "address",
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
        name: "raidCount",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "raids",
        outputs: [
            {
                internalType: "uint256",
                name: "entranceFee",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "nursePart",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "maxRewardCount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "endBlock",
                type: "uint256",
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
        name: "rng",
        outputs: [
            {
                internalType: "contract IRNG",
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
                internalType: "contract IMaidCafe",
                name: "_maidCafe",
                type: "address",
            },
        ],
        name: "setMaidCafe",
        outputs: [],
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
const _bytecode = "0x610100604052600160c08190526103e860e08190526006919091556007553480156200002a57600080fd5b5060405162001e8138038062001e818339810160408190526200004d91620000e0565b600080546001600160a01b031916339081178255604051909182917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3506001600160601b0319606094851b8116608052600480546001600160a01b039586166001600160a01b0319918216179091559290941b90931660a0526005805493909216921691909117905562000161565b60008060008060808587031215620000f757600080fd5b8451620001048162000148565b6020860151909450620001178162000148565b60408601519093506200012a8162000148565b60608601519092506200013d8162000148565b939692955090935050565b6001600160a01b03811681146200015e57600080fd5b50565b60805160601c60a05160601c611cca620001b76000396000818161033f015261056f01526000818161025b0152818161099201528181610d59015281816111910152818161124501526116a60152611cca6000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c80638da5cb5b116100c3578063bd36095a1161007c578063bd36095a1461037c578063c562a6841461038f578063d15d2e43146103a2578063d605787b146103b5578063e20ddcac146103c8578063f2fde38b146103db57600080fd5b80638da5cb5b146102db57806396c52a45146102ec5780639f20ae83146102ff578063b24606b81461033a578063b5aa5d7514610361578063bab1a1951461037457600080fd5b80634b7388e6116101155780634b7388e6146101d65780634b9b586e146101e9578063715018a61461024e578063849e5aff146102565780638656b2b3146102955780638aacfa52146102b857600080fd5b806318c08f2614610152578063230eb4fd14610167578063265bce0a1461018d57806338f65246146101a057806343c5c285146101c3575b600080fd5b6101656101603660046117ac565b6103ee565b005b61017a6101753660046117ee565b610719565b6040519081526020015b60405180910390f35b61016561019b36600461199b565b610990565b6006546007546101ae919082565b60408051928352602083019190915201610184565b6101656101d13660046117ac565b610ae4565b6101656101e43660046117ac565b610b80565b61022b6101f7366004611933565b600260208181526000938452604080852090915291835291208054600182015491909201546001600160a01b039091169083565b604080519384526001600160a01b03909216602084015290820152606001610184565b610165610c1c565b61027d7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610184565b6102a86102a3366004611901565b610c90565b6040519015158152602001610184565b6102a86102c6366004611788565b60036020526000908152604090205460ff1681565b6000546001600160a01b031661027d565b6101656102fa36600461199b565b610d42565b61031261030d366004611901565b610e2d565b604080519586526020860194909452928401919091526060830152608082015260a001610184565b61027d7f000000000000000000000000000000000000000000000000000000000000000081565b61016561036f366004611a26565b610e6e565b60015461017a565b60045461027d906001600160a01b031681565b61016561039d366004611788565b610ef0565b6101656103b0366004611963565b610f3c565b60055461027d906001600160a01b031681565b6101656103d6366004611788565b61131b565b6101656103e9366004611788565b611367565b60005b818110156107145760006002600085858581811061041157610411611c66565b60209081029290920135835250818101929092526040908101600090812033825283528190208151606081018352815480825260018301546001600160a01b0316948201949094526002909101549181019190915291506104ca5760405162461bcd60e51b815260206004820152602860248201527f4e75727365526169643a204e6f742070617274696369706174696e6720696e206044820152671d1a19481c985a5960c21b60648201526084015b60405180910390fd5b600060018585858181106104e0576104e0611c66565b90506020020135815481106104f7576104f7611c66565b90600052602060002090600502019050610515816003015483611451565b156105d557600061054386868681811061053157610531611c66565b90506020020135836002015433611546565b6001830154604051630ab714fb60e11b81523360048201526024810191909152604481018290529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063156e29f690606401600060405180830381600087803b1580156105bb57600080fd5b505af11580156105cf573d6000803e3d6000fd5b50505050505b60208201516001600160a01b03161561065b57602082015160408084015190516323b872dd60e01b815230600482015233602482015260448101919091526001600160a01b03909116906323b872dd90606401600060405180830381600087803b15801561064257600080fd5b505af1158015610656573d6000803e3d6000fd5b505050505b6002600086868681811061067157610671611c66565b60209081029290920135835250818101929092526040908101600090812033825290925281208181556001810180546001600160a01b0319169055600201558484848181106106c2576106c2611c66565b90506020020135336001600160a01b03167f22d324652c93739755cf4581508b60875ebdd78c20c0cff5cf8e23452b29963160405160405180910390a35050808061070c90611c0b565b9150506103f1565b505050565b600080546001600160a01b031633146107445760405162461bcd60e51b81526004016104c190611a89565b8960005b818110156109805760ff89898381811061076457610764611c66565b90506020020135106107b85760405162461bcd60e51b815260206004820152601960248201527f4e75727365526169643a20496e76616c6964206e756d6265720000000000000060448201526064016104c1565b600180549050925060016040518060a001604052808f8f858181106107df576107df611c66565b9050602002013581526020018d8d858181106107fd576107fd611c66565b9050602002013581526020018b8b8581811061081b5761081b611c66565b90506020020135815260200189898581811061083957610839611c66565b90506020020135815260200187878581811061085757610857611c66565b6020908102929092013590925283546001818101865560009586529482902084516005909202019081559083015193810193909355506040810151600283015560608101516003830155608001516004909101558a8a828181106108bd576108bd611c66565b90506020020135837fe67bc7994d282c0fbf31557abeca3bf42c2dc7e627c6aff056739bfd6609b5d68f8f858181106108f8576108f8611c66565b905060200201358c8c8681811061091157610911611c66565b905060200201358b8b8781811061092a5761092a611c66565b905060200201358a8a8881811061094357610943611c66565b604080519687526020878101969096528601939093525091020135606082015260800160405180910390a38061097881611c0b565b915050610748565b50509a9950505050505050505050565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663d505accf333060018e815481106109d4576109d4611c66565b9060005260206000209060050201600001548b8b8b8b6040518863ffffffff1660e01b8152600401610a0c9796959493929190611a48565b600060405180830381600087803b158015610a2657600080fd5b505af1158015610a3a573d6000803e3d6000fd5b505050506001600160a01b03891615610acd57604051637ac2ff7b60e01b8152336004820152602481018990526044810188905260ff841660648201526084810183905260a481018290526001600160a01b038a1690637ac2ff7b9060c4015b600060405180830381600087803b158015610ab457600080fd5b505af1158015610ac8573d6000803e3d6000fd5b505050505b610ad88a8a8a610f3c565b50505050505050505050565b6000546001600160a01b03163314610b0e5760405162461bcd60e51b81526004016104c190611a89565b60005b8181101561071457600160036000858585818110610b3157610b31611c66565b9050602002016020810190610b469190611788565b6001600160a01b031681526020810191909152604001600020805460ff1916911515919091179055610b79600182611abe565b9050610b11565b6000546001600160a01b03163314610baa5760405162461bcd60e51b81526004016104c190611a89565b60005b8181101561071457600060036000858585818110610bcd57610bcd611c66565b9050602002016020810190610be29190611788565b6001600160a01b031681526020810191909152604001600020805460ff1916911515919091179055610c15600182611abe565b9050610bad565b6000546001600160a01b03163314610c465760405162461bcd60e51b81526004016104c190611a89565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b60008060018381548110610ca657610ca6611c66565b600091825260208083206040805160a08101825260059094029091018054845260018082015485850152600280830154868501526003830154606080880191825260049094015460808801528a88528186528488203389528652968490208451938401855280548452918201546001600160a01b03169483019490945290920154908201529151909250610d3a9082611451565b949350505050565b60405163d505accf60e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063d505accf90610d9c9033903090600019908d908d908d908d90600401611a48565b600060405180830381600087803b158015610db657600080fd5b505af1158015610dca573d6000803e3d6000fd5b505050506001600160a01b03891615610acd5760405163aba0784760e01b81523360048201523060248201526044810188905260ff841660648201526084810183905260a481018290526001600160a01b038a169063aba078479060c401610a9a565b60018181548110610e3d57600080fd5b6000918252602090912060059091020180546001820154600283015460038401546004909401549294509092909185565b6000546001600160a01b03163314610e985760405162461bcd60e51b81526004016104c190611a89565b60408051808201825283815260209081018390526006849055600783905581518481529081018390527fb8cded0f783883feb28d3a46c16a1394521d97ce9b29f85f4f9979eaf4b32e26910160405180910390a15050565b6000546001600160a01b03163314610f1a5760405162461bcd60e51b81526004016104c190611a89565b600580546001600160a01b0319166001600160a01b0392909216919091179055565b816001600160a01b0381161580610f6b57506001600160a01b03811660009081526003602052604090205460ff165b610fc35760405162461bcd60e51b8152602060048201526024808201527f4e75727365526169643a20546865206d61696473206973206e6f7420617070726044820152631bdd995960e21b60648201526084016104c1565b600060018581548110610fd857610fd8611c66565b906000526020600020906005020190508060040154431061103b5760405162461bcd60e51b815260206004820152601960248201527f4e75727365526169643a20526169642068617320656e6465640000000000000060448201526064016104c1565b6000858152600260209081526040808320338452909152902054156110a25760405162461bcd60e51b815260206004820152601e60248201527f4e75727365526169643a205261696420697320696e2070726f6772657373000060448201526064016104c1565b604080516060810182524381526001600160a01b03868116602080840182815284860189815260008c815260028085528882203383529094529690962094518555516001850180546001600160a01b031916919094161790925592519101551561116d576040516323b872dd60e01b8152336004820152306024820152604481018490526001600160a01b038516906323b872dd90606401600060405180830381600087803b15801561115457600080fd5b505af1158015611168573d6000803e3d6000fd5b505050505b80546040516323b872dd60e01b8152336004820152306024820152604481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906323b872dd90606401602060405180830381600087803b1580156111dd57600080fd5b505af11580156111f1573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061121591906118df565b5060006103e8611226836003611bd5565b6112309190611ad6565b905061123b8161167a565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000166342966c686112748385611bf4565b6040518263ffffffff1660e01b815260040161129291815260200190565b600060405180830381600087803b1580156112ac57600080fd5b505af11580156112c0573d6000803e3d6000fd5b50505050856001600160a01b031687336001600160a01b03167fdbaee2f8bdfe2e27e53a55ba816b9e0b74c12780d27d142b35023fa491602d618860405161130a91815260200190565b60405180910390a450505050505050565b6000546001600160a01b031633146113455760405162461bcd60e51b81526004016104c190611a89565b600480546001600160a01b0319166001600160a01b0392909216919091179055565b6000546001600160a01b031633146113915760405162461bcd60e51b81526004016104c190611a89565b6001600160a01b0381166113f65760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104c1565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b60208101516000906001600160a01b031661147d57815183906114749043611bf4565b10159050611540565b600754600654602084015160408086015190516304eaa11360e01b81526001600160a01b03909216916304eaa113916114bc9160040190815260200190565b60206040518083038186803b1580156114d457600080fd5b505afa1580156114e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061150c919061191a565b6115169086611bd5565b6115209190611bd5565b61152a9190611ad6565b6115349084611bf4565b82516114749043611bf4565b92915050565b6000806001611556856002611b2d565b6115609190611bf4565b61156b906002611bd5565b6005546040516344a0a49160e01b8152600481018890526001600160a01b038681166024830152929350600092849216906344a0a49190604401602060405180830381600087803b1580156115bf57600080fd5b505af11580156115d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115f7919061191a565b6116019190611c26565b61160c906001611abe565b90506000805b8183111561166f57611625600182611abe565b905080611633886001611abe565b61163d9190611bf4565b611648906002611b2d565b611653886001611abe565b61165e906002611b2d565b6116689190611bf4565b9150611612565b979650505050505050565b6004805460405163a9059cbb60e01b81526001600160a01b0391821692810192909252602482018390527f0000000000000000000000000000000000000000000000000000000000000000169063a9059cbb90604401602060405180830381600087803b1580156116ea57600080fd5b505af11580156116fe573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061172291906118df565b5050565b60008083601f84011261173857600080fd5b50813567ffffffffffffffff81111561175057600080fd5b6020830191508360208260051b850101111561176b57600080fd5b9250929050565b803560ff8116811461178357600080fd5b919050565b60006020828403121561179a57600080fd5b81356117a581611c7c565b9392505050565b600080602083850312156117bf57600080fd5b823567ffffffffffffffff8111156117d657600080fd5b6117e285828601611726565b90969095509350505050565b60008060008060008060008060008060a08b8d03121561180d57600080fd5b8a3567ffffffffffffffff8082111561182557600080fd5b6118318e838f01611726565b909c509a5060208d013591508082111561184a57600080fd5b6118568e838f01611726565b909a50985060408d013591508082111561186f57600080fd5b61187b8e838f01611726565b909850965060608d013591508082111561189457600080fd5b6118a08e838f01611726565b909650945060808d01359150808211156118b957600080fd5b506118c68d828e01611726565b915080935050809150509295989b9194979a5092959850565b6000602082840312156118f157600080fd5b815180151581146117a557600080fd5b60006020828403121561191357600080fd5b5035919050565b60006020828403121561192c57600080fd5b5051919050565b6000806040838503121561194657600080fd5b82359150602083013561195881611c7c565b809150509250929050565b60008060006060848603121561197857600080fd5b83359250602084013561198a81611c7c565b929592945050506040919091013590565b6000806000806000806000806000806101408b8d0312156119bb57600080fd5b8a35995060208b01356119cd81611c7c565b985060408b0135975060608b013596506119e960808c01611772565b955060a08b0135945060c08b01359350611a0560e08c01611772565b92506101008b013591506101208b013590509295989b9194979a5092959850565b60008060408385031215611a3957600080fd5b50508035926020909101359150565b6001600160a01b0397881681529590961660208601526040850193909352606084019190915260ff16608083015260a082015260c081019190915260e00190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008219821115611ad157611ad1611c3a565b500190565b600082611ae557611ae5611c50565b500490565b600181815b80851115611b25578160001904821115611b0b57611b0b611c3a565b80851615611b1857918102915b93841c9390800290611aef565b509250929050565b60006117a58383600082611b4357506001611540565b81611b5057506000611540565b8160018114611b665760028114611b7057611b8c565b6001915050611540565b60ff841115611b8157611b81611c3a565b50506001821b611540565b5060208310610133831016604e8410600b8410161715611baf575081810a611540565b611bb98383611aea565b8060001904821115611bcd57611bcd611c3a565b029392505050565b6000816000190483118215151615611bef57611bef611c3a565b500290565b600082821015611c0657611c06611c3a565b500390565b6000600019821415611c1f57611c1f611c3a565b5060010190565b600082611c3557611c35611c50565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b6001600160a01b0381168114611c9157600080fd5b5056fea264697066735822122017457297572201ab8e698ba9818506b99e31c0af693219b78d46bf3739dabb4a64736f6c63430008050033";
class NurseRaid__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_maidCoin, _maidCafe, _nursePart, _rng, overrides) {
        return super.deploy(_maidCoin, _maidCafe, _nursePart, _rng, overrides || {});
    }
    getDeployTransaction(_maidCoin, _maidCafe, _nursePart, _rng, overrides) {
        return super.getDeployTransaction(_maidCoin, _maidCafe, _nursePart, _rng, overrides || {});
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
exports.NurseRaid__factory = NurseRaid__factory;
NurseRaid__factory.bytecode = _bytecode;
NurseRaid__factory.abi = _abi;
//# sourceMappingURL=NurseRaid__factory.js.map