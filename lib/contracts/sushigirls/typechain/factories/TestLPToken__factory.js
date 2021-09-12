"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestLPToken__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class TestLPToken__factory extends contracts_1.ContractFactory {
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
exports.TestLPToken__factory = TestLPToken__factory;
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
                internalType: "address",
                name: "from",
                type: "address",
            },
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
];
const _bytecode = "0x600b60808181526a2a32b9ba26282a37b5b2b760a91b60a0908152610100604052600660c0908152650544553544c560d41b60e052919261004291600091610157565b508051610056906001906020840190610157565b506040514690806052610ce9823960520190506040518091039020600060405180828054600181600116156101000203166002900480156100ce5780601f106100ac5761010080835404028352918201916100ce565b820191906000526020600020905b8154815290600101906020018083116100ba575b505060408051918290038220828201825260018352603160f81b602093840152815180840196909652858201527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606086015260808501959095523060a0808601919091528551808603909101815260c090940190945250508051910120600555506101f29050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061019857805160ff19168380011785556101c5565b828001600101855582156101c5579182015b828111156101c55782518255916020019190600101906101aa565b506101d19291506101d5565b5090565b6101ef91905b808211156101d157600081556001016101db565b90565b610ae8806102016000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806340c10f19116100975780639dc29fac116100665780639dc29fac146102b7578063a9059cbb146102e3578063d505accf1461030f578063dd62ed3e14610360576100f5565b806340c10f191461023557806370a08231146102635780637ecebe001461028957806395d89b41146102af576100f5565b806323b872dd116100d357806323b872dd146101d157806330adf81f14610207578063313ce5671461020f5780633644e5151461022d576100f5565b806306fdde03146100fa578063095ea7b31461017757806318160ddd146101b7575b600080fd5b61010261038e565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561013c578181015183820152602001610124565b50505050905090810190601f1680156101695780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101a36004803603604081101561018d57600080fd5b506001600160a01b03813516906020013561041c565b604080519115158252519081900360200190f35b6101bf610433565b60408051918252519081900360200190f35b6101a3600480360360608110156101e757600080fd5b506001600160a01b03813581169160208101359091169060400135610439565b6101bf6104d3565b6102176104f7565b6040805160ff9092168252519081900360200190f35b6101bf6104fc565b6102616004803603604081101561024b57600080fd5b506001600160a01b038135169060200135610502565b005b6101bf6004803603602081101561027957600080fd5b50356001600160a01b0316610510565b6101bf6004803603602081101561029f57600080fd5b50356001600160a01b0316610522565b610102610534565b610261600480360360408110156102cd57600080fd5b506001600160a01b03813516906020013561058e565b6101a3600480360360408110156102f957600080fd5b506001600160a01b038135169060200135610598565b610261600480360360e081101561032557600080fd5b506001600160a01b03813581169160208101359091169060408101359060608101359060ff6080820135169060a08101359060c001356105a5565b6101bf6004803603604081101561037657600080fd5b506001600160a01b03813581169160200135166107a7565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104145780601f106103e957610100808354040283529160200191610414565b820191906000526020600020905b8154815290600101906020018083116103f757829003601f168201915b505050505081565b60006104293384846107c4565b5060015b92915050565b60025481565b6001600160a01b0383166000908152600460209081526040808320338452909152812054600019146104be576001600160a01b0384166000908152600460209081526040808320338452909152902054610499908363ffffffff61082616565b6001600160a01b03851660009081526004602090815260408083203384529091529020555b6104c9848484610876565b5060019392505050565b7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b601281565b60055481565b61050c8282610930565b5050565b60036020526000908152604090205481565b60066020526000908152604090205481565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104145780601f106103e957610100808354040283529160200191610414565b61050c82826109c7565b6000610429338484610876565b428410156105ef576040805162461bcd60e51b8152602060048201526012602482015271155b9a5cddd85c158c8e881156141254915160721b604482015290519081900360640190fd5b6005546001600160a01b0380891660008181526006602090815260408083208054600180820190925582517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98186015280840196909652958d166060860152608085018c905260a085019590955260c08085018b90528151808603909101815260e08501825280519083012061190160f01b6101008601526101028501969096526101228085019690965280518085039096018652610142840180825286519683019690962095839052610162840180825286905260ff89166101828501526101a284018890526101c28401879052519193926101e280820193601f1981019281900390910190855afa15801561070a573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906107405750886001600160a01b0316816001600160a01b0316145b610791576040805162461bcd60e51b815260206004820152601c60248201527f556e697377617056323a20494e56414c49445f5349474e415455524500000000604482015290519081900360640190fd5b61079c8989896107c4565b505050505050505050565b600460209081526000928352604080842090915290825290205481565b6001600160a01b03808416600081815260046020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b8082038281111561042d576040805162461bcd60e51b815260206004820152601560248201527464732d6d6174682d7375622d756e646572666c6f7760581b604482015290519081900360640190fd5b6001600160a01b03831660009081526003602052604090205461089f908263ffffffff61082616565b6001600160a01b0380851660009081526003602052604080822093909355908416815220546108d4908263ffffffff610a6416565b6001600160a01b0380841660008181526003602090815260409182902094909455805185815290519193928716927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a3505050565b600254610943908263ffffffff610a6416565b6002556001600160a01b03821660009081526003602052604090205461096f908263ffffffff610a6416565b6001600160a01b03831660008181526003602090815260408083209490945583518581529351929391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b6001600160a01b0382166000908152600360205260409020546109f0908263ffffffff61082616565b6001600160a01b038316600090815260036020526040902055600254610a1c908263ffffffff61082616565b6002556040805182815290516000916001600160a01b038516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b8082018281101561042d576040805162461bcd60e51b815260206004820152601460248201527364732d6d6174682d6164642d6f766572666c6f7760601b604482015290519081900360640190fdfea265627a7a7231582004b6764a2451f32b0b4f746f0e67a1a1778a22645c908f8d5ffcc6af6e1bc78564736f6c63430005100032454950373132446f6d61696e28737472696e67206e616d652c737472696e672076657273696f6e2c75696e7432353620636861696e49642c6164647265737320766572696679696e67436f6e747261637429";
//# sourceMappingURL=TestLPToken__factory.js.map