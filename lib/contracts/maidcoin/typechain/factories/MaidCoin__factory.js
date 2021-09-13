"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaidCoin__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class MaidCoin__factory extends contracts_1.ContractFactory {
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
    static connect(address, signerOrProvider) {
        return new contracts_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.MaidCoin__factory = MaidCoin__factory;
const _abi = [
    {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
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
        constant: true,
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "INITIAL_SUPPLY",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "PERMIT_TYPEHASH",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
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
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "isOwner",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
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
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
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
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "deadline",
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
        name: "permit",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
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
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
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
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b50604080518082018252600881526726b0b4b221b7b4b760c11b602080830191909152825180840184526005815264091350525160da1b91810191909152600080546001600160a01b03191633178082559351929391926001600160a01b0392909216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a38151620000af906001906020850190620002f3565b508051620000c5906002906020840190620002f3565b5060405146908060526200116c82396052019050604051809103902060016040518082805460018160011615610100020316600290048015620001425780601f106200011f57610100808354040283529182019162000142565b820191906000526020600020905b8154815290600101906020018083116200012d575b505060408051918290038220828201825260018352603160f81b602093840152815180840196909652858201527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606086015260808501959095523060a0808601919091528551808603909101815260c09094019094525050805191012060065550620001e5905033690df9ddfecd03654000006001600160e01b03620001eb16565b62000398565b62000207816003546200029460201b62000d1a1790919060201c565b6003556001600160a01b0382166000908152600460209081526040909120546200023c91839062000d1a62000294821b17901c565b6001600160a01b03831660008181526004602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b80820182811015620002ed576040805162461bcd60e51b815260206004820152601460248201527f64732d6d6174682d6164642d6f766572666c6f77000000000000000000000000604482015290519081900360640190fd5b92915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200033657805160ff191683800117855562000366565b8280016001018555821562000366579182015b828111156200036657825182559160200191906001019062000349565b506200037492915062000378565b5090565b6200039591905b808211156200037457600081556001016200037f565b90565b610dc480620003a86000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806370a08231116100ad57806395d89b411161007157806395d89b411461033f578063a9059cbb14610347578063d505accf14610373578063dd62ed3e146103c4578063f2fde38b146103f25761012c565b806370a08231146102bf578063715018a6146102e55780637ecebe00146102ed5780638da5cb5b146103135780638f32d59b146103375761012c565b806330adf81f116100f457806330adf81f14610246578063313ce5671461024e5780633644e5151461026c57806340c10f191461027457806342966c68146102a25761012c565b806306fdde0314610131578063095ea7b3146101ae57806318160ddd146101ee57806323b872dd146102085780632ff2e9dc1461023e575b600080fd5b610139610418565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561017357818101518382015260200161015b565b50505050905090810190601f1680156101a05780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101da600480360360408110156101c457600080fd5b506001600160a01b0381351690602001356104a5565b604080519115158252519081900360200190f35b6101f66104bc565b60408051918252519081900360200190f35b6101da6004803603606081101561021e57600080fd5b506001600160a01b038135811691602081013590911690604001356104c2565b6101f661055c565b6101f661056a565b61025661058e565b6040805160ff9092168252519081900360200190f35b6101f6610593565b6102a06004803603604081101561028a57600080fd5b506001600160a01b038135169060200135610599565b005b6102a0600480360360208110156102b857600080fd5b5035610600565b6101f6600480360360208110156102d557600080fd5b50356001600160a01b031661060d565b6102a061061f565b6101f66004803603602081101561030357600080fd5b50356001600160a01b03166106c2565b61031b6106d4565b604080516001600160a01b039092168252519081900360200190f35b6101da6106e3565b6101396106f4565b6101da6004803603604081101561035d57600080fd5b506001600160a01b03813516906020013561074c565b6102a0600480360360e081101561038957600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c00135610759565b6101f6600480360360408110156103da57600080fd5b506001600160a01b038135811691602001351661095b565b6102a06004803603602081101561040857600080fd5b50356001600160a01b0316610978565b60018054604080516020600284861615610100026000190190941693909304601f8101849004840282018401909252818152929183018282801561049d5780601f106104725761010080835404028352916020019161049d565b820191906000526020600020905b81548152906001019060200180831161048057829003601f168201915b505050505081565b60006104b23384846109da565b5060015b92915050565b60035481565b6001600160a01b038316600090815260056020908152604080832033845290915281205460001914610547576001600160a01b0384166000908152600560209081526040808320338452909152902054610522908363ffffffff610a3c16565b6001600160a01b03851660009081526005602090815260408083203384529091529020555b610552848484610a8c565b5060019392505050565b690df9ddfecd036540000081565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601281565b60065481565b6105a16106e3565b6105f2576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6105fc8282610b46565b5050565b61060a3382610bdd565b50565b60046020526000908152604090205481565b6106276106e3565b610678576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b60076020526000908152604090205481565b6000546001600160a01b031690565b6000546001600160a01b0316331490565b6002805460408051602060018416156101000260001901909316849004601f8101849004840282018401909252818152929183018282801561049d5780601f106104725761010080835404028352916020019161049d565b60006104b2338484610a8c565b428410156107a3576040805162461bcd60e51b8152602060048201526012602482015271155b9a5cddd85c158c8e881156141254915160721b604482015290519081900360640190fd5b6006546001600160a01b0380891660008181526007602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958d166060860152608085018c905260a085019590955260c08085018b90528151808603909101815260e08501825280519083012061190160f01b6101008601526101028501969096526101228085019690965280518085039096018652610142840180825286519683019690962095839052610162840180825286905260ff89166101828501526101a284018890526101c28401879052519193926101e280820193601f1981019281900390910190855afa1580156108be573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906108f45750886001600160a01b0316816001600160a01b0316145b610945576040805162461bcd60e51b815260206004820152601c60248201527f556e697377617056323a20494e56414c49445f5349474e415455524500000000604482015290519081900360640190fd5b6109508989896109da565b505050505050505050565b600560209081526000928352604080842090915290825290205481565b6109806106e3565b6109d1576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61060a81610c7a565b6001600160a01b03808416600081815260056020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b808203828111156104b6576040805162461bcd60e51b815260206004820152601560248201527464732d6d6174682d7375622d756e646572666c6f7760581b604482015290519081900360640190fd5b6001600160a01b038316600090815260046020526040902054610ab5908263ffffffff610a3c16565b6001600160a01b038085166000908152600460205260408082209390935590841681522054610aea908263ffffffff610d1a16565b6001600160a01b0380841660008181526004602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600354610b59908263ffffffff610d1a16565b6003556001600160a01b038216600090815260046020526040902054610b85908263ffffffff610d1a16565b6001600160a01b03831660008181526004602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b038216600090815260046020526040902054610c06908263ffffffff610a3c16565b6001600160a01b038316600090815260046020526040902055600354610c32908263ffffffff610a3c16565b6003556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b6001600160a01b038116610cbf5760405162461bcd60e51b8152600401808060200182810382526026815260200180610d6a6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b808201828110156104b6576040805162461bcd60e51b815260206004820152601460248201527364732d6d6174682d6164642d6f766572666c6f7760601b604482015290519081900360640190fdfe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a265627a7a7231582092885466df3ce2ad3e16c2b903488826203fbe82f78461a6a1e5f61cc5018d0764736f6c63430005100032454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c75696e7432353620636861696e49642c6164647265737320766572696679696e67436f6e747261637429";
//# sourceMappingURL=MaidCoin__factory.js.map