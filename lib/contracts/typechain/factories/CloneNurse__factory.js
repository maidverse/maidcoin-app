"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloneNurse__factory = void 0;
const contracts_1 = require("@ethersproject/contracts");
class CloneNurse__factory extends contracts_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_nursePart, _maidCoin, _theMaster, overrides) {
        return super.deploy(_nursePart, _maidCoin, _theMaster, overrides || {});
    }
    getDeployTransaction(_nursePart, _maidCoin, _theMaster, overrides) {
        return super.getDeployTransaction(_nursePart, _maidCoin, _theMaster, overrides || {});
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
exports.CloneNurse__factory = CloneNurse__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "contract INursePart",
                name: "_nursePart",
                type: "address",
            },
            {
                internalType: "contract IMaidCoin",
                name: "_maidCoin",
                type: "address",
            },
            {
                internalType: "contract ITheMaster",
                name: "_theMaster",
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
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
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
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
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
                internalType: "int256",
                name: "power",
                type: "int256",
            },
        ],
        name: "ChangeSupportedPower",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "from",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "to",
                type: "uint256",
            },
        ],
        name: "ChangeSupportingRoute",
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
                indexed: true,
                internalType: "address",
                name: "claimer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "reward",
                type: "uint256",
            },
        ],
        name: "Claim",
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
                name: "supporter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "to",
                type: "uint256",
            },
        ],
        name: "SupportTo",
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
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
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
                name: "supporter",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amounts",
                type: "uint256",
            },
        ],
        name: "TransferSupportingRewards",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "partCount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "destroyReturn",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "power",
                type: "uint256",
            },
        ],
        name: "addNurseType",
        outputs: [
            {
                internalType: "uint256",
                name: "nurseType",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_nurseType",
                type: "uint256",
            },
        ],
        name: "assemble",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "nurseType",
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
        name: "assembleWithPermit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
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
                name: "supporter",
                type: "address",
            },
            {
                internalType: "int256",
                name: "power",
                type: "int256",
            },
        ],
        name: "changeSupportedPower",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "supporter",
                type: "address",
            },
        ],
        name: "checkSupportingRoute",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
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
        name: "claim",
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
                internalType: "uint256",
                name: "toId",
                type: "uint256",
            },
        ],
        name: "destroy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
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
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
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
        name: "nurseTypeCount",
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
        name: "nurseTypes",
        outputs: [
            {
                internalType: "uint256",
                name: "partCount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "destroyReturn",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "power",
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
        name: "nurses",
        outputs: [
            {
                internalType: "uint256",
                name: "nurseType",
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
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC1155BatchReceived",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
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
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC1155Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
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
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
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
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "pendingReward",
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
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
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
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
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
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "supporter",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "to",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amounts",
                type: "uint256",
            },
        ],
        name: "setSupportingTo",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "pending",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "supporter",
                type: "address",
            },
            {
                internalType: "uint8",
                name: "supportingRatio",
                type: "uint8",
            },
        ],
        name: "shareRewards",
        outputs: [
            {
                internalType: "address",
                name: "nurseOwner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amountToNurseOwner",
                type: "uint256",
            },
        ],
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
        ],
        name: "supportedPower",
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
        name: "supportingRoute",
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
        name: "supportingTo",
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
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
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
        name: "theMaster",
        outputs: [
            {
                internalType: "contract ITheMaster",
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
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenByIndex",
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
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenOfOwnerByIndex",
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
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "totalRewardsFromSupporters",
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
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
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
const _bytecode = "0x60e06040523480156200001157600080fd5b506040516200368c3803806200368c8339810160408190526200003491620001d2565b6040518060400160405280600a815260200169436c6f6e654e7572736560b01b81525060405180604001604052806006815260200165434e5552534560d01b8152506000620000886200012860201b60201c565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3508151620000e79060019060208501906200012c565b508051620000fd9060029060208401906200012c565b5050506001600160601b0319606093841b811660805291831b821660a05290911b1660c0526200027c565b3390565b8280546200013a9062000226565b90600052602060002090601f0160209004810192826200015e5760008555620001a9565b82601f106200017957805160ff1916838001178555620001a9565b82800160010185558215620001a9579182015b82811115620001a95782518255916020019190600101906200018c565b50620001b7929150620001bb565b5090565b5b80821115620001b75760008155600101620001bc565b600080600060608486031215620001e857600080fd5b8351620001f58162000263565b6020850151909350620002088162000263565b60408501519092506200021b8162000263565b809150509250925092565b600181811c908216806200023b57607f821691505b602082108114156200025d57634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b03811681146200027957600080fd5b50565b60805160601c60a05160601c60c05160601c6133606200032c600039600081816104310152818161069301528181610a8c01528181610cce01528181611230015281816115560152818161185a01528181611ae60152611ccf01526000818161047301528181610c2601528181610d4801528181610dfd015281816117ac015281816118d5015261198a0152600081816104d9015281816113d901528181611bbe0152611c3d01526133606000f3fe608060405234801561001057600080fd5b50600436106102535760003560e01c806370a0823111610146578063bc197c81116100c3578063e3a9405111610087578063e3a94051146105c0578063e6a6e7a2146105d3578063e985e9c5146105e6578063f23a6e6114610622578063f2fde38b14610641578063fa600f761461065457600080fd5b8063bc197c8114610521578063c0a2449914610559578063c87b56dd1461056c578063cd5a146e1461057f578063ddfeacca146105ad57600080fd5b806395d89b411161010a57806395d89b41146104b9578063a22cb465146104c1578063b24606b8146104d4578063b252144a146104fb578063b88d4fde1461050e57600080fd5b806370a0823114610453578063715018a614610466578063849e5aff1461046e5780638da5cb5b146104955780639222ce8c146104a657600080fd5b8063184935c1116101d45780633a64e0d1116101985780633a64e0d1146103e057806342842e0e146103f35780634f6ccce7146104065780636352211e14610419578063671104c91461042c57600080fd5b8063184935c11461036757806323b872dd146103875780632b2269b81461039a5780632f745c59146103ba578063379607f5146103cd57600080fd5b8063095ea7b31161021b578063095ea7b31461030457806309805b941461031957806311b9e6b21461032c57806312f7086c1461034c57806318160ddd1461035f57600080fd5b806301ffc9a71461025857806303273bc714610280578063060f1938146102b257806306fdde03146102c4578063081812fc146102d9575b600080fd5b61026b610266366004612dfb565b610674565b60405190151581526020015b60405180910390f35b61029361028e366004612e67565b610685565b604080516001600160a01b039093168352602083019190915201610277565b600f545b604051908152602001610277565b6102cc61071e565b6040516102779190612fd0565b6102ec6102e7366004612e35565b6107b0565b6040516001600160a01b039091168152602001610277565b610317610312366004612d81565b610838565b005b6102b6610327366004612ec5565b61094e565b6102b661033a366004612e35565b600d6020526000908152604090205481565b6102b661035a366004612e35565b610a1f565b6009546102b6565b6102b6610375366004612e35565b600e6020526000908152604090205481565b610317610395366004612c41565b610b0e565b6102b66103a8366004612e35565b600b6020526000908152604090205481565b6102b66103c8366004612d81565b610b3f565b6103176103db366004612e35565b610bd5565b6102b66103ee366004612e35565b610ec0565b610317610401366004612c41565b610ee1565b6102b6610414366004612e35565b610efc565b6102ec610427366004612e35565b610f8f565b6102ec7f000000000000000000000000000000000000000000000000000000000000000081565b6102b6610461366004612b49565b611006565b61031761108d565b6102ec7f000000000000000000000000000000000000000000000000000000000000000081565b6000546001600160a01b03166102ec565b6102936104b4366004612b49565b611101565b6102cc611207565b6103176104cf366004612d4a565b611216565b6102ec7f000000000000000000000000000000000000000000000000000000000000000081565b610317610509366004612dab565b611225565b61031761051c366004612c7d565b611368565b61054061052f366004612b97565b63bc197c8160e01b95945050505050565b6040516001600160e01b03199091168152602001610277565b610317610567366004612ef1565b6113a0565b6102cc61057a366004612e35565b61144d565b61059261058d366004612e35565b611518565b60408051938452602084019290925290820152606001610277565b6103176105bb366004612d81565b61154b565b6103176105ce366004612ea3565b611672565b6103176105e1366004612e35565b611b5c565b61026b6105f4366004612b64565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205460ff1690565b610540610630366004612ce5565b63f23a6e6160e01b95945050505050565b61031761064f366004612b49565b611dbb565b6102b6610662366004612b49565b600c6020526000908152604090205481565b600061067f82611ea5565b92915050565b600080336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146106d95760405162461bcd60e51b81526004016106d09061306a565b60405180910390fd5b60646106e860ff851687613188565b6106f29190613174565b9050600081156107155761070585611101565b9093509050610715858284611eca565b50935093915050565b60606001805461072d906131ea565b80601f0160208091040260200160405190810160405280929190818152602001828054610759906131ea565b80156107a65780601f1061077b576101008083540402835291602001916107a6565b820191906000526020600020905b81548152906001019060200180831161078957829003601f168201915b5050505050905090565b60006107bb82611f33565b61081c5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016106d0565b506000908152600560205260409020546001600160a01b031690565b600061084382610f8f565b9050806001600160a01b0316836001600160a01b031614156108b15760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016106d0565b336001600160a01b03821614806108cd57506108cd81336105f4565b61093f5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016106d0565b6109498383611f50565b505050565b600080546001600160a01b031633146109795760405162461bcd60e51b81526004016106d090613035565b50600f8054604080516060810182529586526020860194855285019283526001810182556000919091529251600384027f8d1108e10bcb7c27dddfc02ed9d693a074039d026cf4ea4240b40f7d581ac80281019190915591517f8d1108e10bcb7c27dddfc02ed9d693a074039d026cf4ea4240b40f7d581ac803830155517f8d1108e10bcb7c27dddfc02ed9d693a074039d026cf4ea4240b40f7d581ac8049091015590565b6000610a2a82611f33565b610a6f5760405162461bcd60e51b815260206004820152601660248201527510db1bdb99539d5c9cd94e88125b9d985b1a59081a5960521b60448201526064016106d0565b604051633185c0bd60e01b815260026004820152602481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690633185c0bd9060440160206040518083038186803b158015610ad657600080fd5b505afa158015610aea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067f9190612e4e565b610b183382611fbe565b610b345760405162461bcd60e51b81526004016106d090613099565b6109498383836120a8565b6000610b4a83611006565b8210610bac5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b60648201526084016106d0565b506001600160a01b03919091166000908152600760209081526040808320938352929052205490565b610bde81610f8f565b6001600160a01b0316336001600160a01b031614610c0e5760405162461bcd60e51b81526004016106d09061306a565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b158015610c7057600080fd5b505afa158015610c84573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ca89190612e4e565b604051625777c560e11b81526002600482015260006024820152604481018490529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169062aeef8a90606401600060405180830381600087803b158015610d1957600080fd5b505af1158015610d2d573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691506370a082319060240160206040518083038186803b158015610d9357600080fd5b505afa158015610da7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dcb9190612e4e565b90506000610dd983836131a7565b90508015610e835760405163a9059cbb60e01b8152336004820152602481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a9059cbb90604401602060405180830381600087803b158015610e4957600080fd5b505af1158015610e5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e819190612dde565b505b604051818152339085907f3ed1528b0fdc7c5207c1bf935e34a667e13656b9ed165260c522be0bc544f3039060200160405180910390a350505050565b60108181548110610ed057600080fd5b600091825260209091200154905081565b61094983838360405180602001604052806000815250611368565b6000610f0760095490565b8210610f6a5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b60648201526084016106d0565b60098281548110610f7d57610f7d6132b3565b90600052602060002001549050919050565b6000818152600360205260408120546001600160a01b03168061067f5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016106d0565b60006001600160a01b0382166110715760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016106d0565b506001600160a01b031660009081526004602052604090205490565b6000546001600160a01b031633146110b75760405162461bcd60e51b81526004016106d090613035565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6001600160a01b0381166000908152600c6020908152604080832054808452600b909252822054829190808214156111475761113c82610f8f565b959194509092505050565b815b828214611167576000828152600b6020526040902054919250611149565b6001600160a01b0386166000908152600c60209081526040808320869055838352600b90915280822085905551849183917f692926c201c1a490c1553d7bd4d53beeae98652233db64a10ec99102aaadc9d39190a360405183906001600160a01b038816907f74afd1219e1106da193179db213370f587f8a6893614bd79eae534375ba60b9a90600090a36111fb83610f8f565b96929550919350505050565b60606002805461072d906131ea565b611221338383612253565b5050565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461126d5760405162461bcd60e51b81526004016106d09061306a565b61127682611f33565b6112c25760405162461bcd60e51b815260206004820152601a60248201527f436c6f6e654e757273653a20496e76616c69642074617267657400000000000060448201526064016106d0565b6001600160a01b0383166000818152600c6020526040808220859055518492917f74afd1219e1106da193179db213370f587f8a6893614bd79eae534375ba60b9a91a38015610949576000828152600d60205260408120805483929061132990849061315c565b909155505060405181815282907f95dbced4d615bf88768e343c98d3d10cd6458a8fab8cc8a1b5ae9cb6916773659060200160405180910390a2505050565b6113723383611fbe565b61138e5760405162461bcd60e51b81526004016106d090613099565b61139a8484848461231a565b50505050565b60405163090c278560e31b81523360048201523060248201526044810185905260ff841660648201526084810183905260a481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906348613c289060c401600060405180830381600087803b15801561142557600080fd5b505af1158015611439573d6000803e3d6000fd5b5050505061144685611b5c565b5050505050565b606061145882611f33565b6114bc5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016106d0565b60006114c661234d565b905060008151116114e65760405180602001604052806000815250611511565b806114f08461236d565b604051602001611501929190612f64565b6040516020818303038152906040525b9392505050565b600f818154811061152857600080fd5b600091825260209091206003909102018054600182015460029092015490925083565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146115935760405162461bcd60e51b81526004016106d09061306a565b600061159e83611101565b6000818152600d6020526040812054919350909150831215611612576115c383613254565b8112156116125760405162461bcd60e51b815260206004820152601b60248201527f436c6f6e654e757273653a204f757472616e67656420706f776572000000000060448201526064016106d0565b61161c838261311b565b6000838152600d6020526040908190208290555190915082907f95dbced4d615bf88768e343c98d3d10cd6458a8fab8cc8a1b5ae9cb691677365906116649086815260200190565b60405180910390a250505050565b818114156116c25760405162461bcd60e51b815260206004820152601c60248201527f436c6f6e654e757273653a20496e76616c69642069642c20746f49640000000060448201526064016106d0565b6116cb82610f8f565b6001600160a01b0316336001600160a01b0316146116fb5760405162461bcd60e51b81526004016106d09061306a565b61170481611f33565b6117505760405162461bcd60e51b815260206004820152601860248201527f436c6f6e654e757273653a20496e76616c696420746f4964000000000000000060448201526064016106d0565b6000600f60108481548110611767576117676132b3565b906000526020600020016000015481548110611785576117856132b3565b6000918252602082206040516370a0823160e01b81523060048201526003929092020192507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b1580156117f657600080fd5b505afa15801561180a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061182e9190612e4e565b60028381015460405163a41fe49f60e01b815260048101929092526024820152604481018690529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a41fe49f90606401600060405180830381600087803b1580156118a657600080fd5b505af11580156118ba573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691506370a082319060240160206040518083038186803b15801561192057600080fd5b505afa158015611934573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119589190612e4e565b9050600061196683836131a7565b90508015611a105760405163a9059cbb60e01b8152336004820152602481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a9059cbb90604401602060405180830381600087803b1580156119d657600080fd5b505af11580156119ea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a0e9190612dde565b505b6000868152600b602052604080822087905551869188917f692926c201c1a490c1553d7bd4d53beeae98652233db64a10ec99102aaadc9d39190a36000868152600d602052604080822054878352908220805491928392611a7290849061315c565b90915550506000878152600d6020526040808220919091555186907f95dbced4d615bf88768e343c98d3d10cd6458a8fab8cc8a1b5ae9cb69167736590611abc9084815260200190565b60405180910390a260018501546040516340c10f1960e01b815233600482015260248101919091527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906340c10f1990604401600060405180830381600087803b158015611b3257600080fd5b505af1158015611b46573d6000803e3d6000fd5b50505050611b538761246b565b50505050505050565b6000600f8281548110611b7157611b716132b3565b6000918252602082206003909102018054604051637921219560e11b8152336004820152306024820152604481018690526064810182905260a0608482015260a4810193909352909250907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063f242432a9060c401600060405180830381600087803b158015611c0a57600080fd5b505af1158015611c1e573d6000803e3d6000fd5b505060405163b390c0ab60e01b815260048101869052602481018490527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316925063b390c0ab9150604401600060405180830381600087803b158015611c8b57600080fd5b505af1158015611c9f573d6000803e3d6000fd5b5050601054600285810154604051625777c560e11b815260048101929092526024820152604481018290529092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316915062aeef8a90606401600060405180830381600087803b158015611d1b57600080fd5b505af1158015611d2f573d6000803e3d6000fd5b5050604080516020808201835288825260108054600181018255600091825292517f1b6847dc741a1b0cd08d278845f9d819d87b734759afb55fe2de5cb82a9ae67290930192909255858252600b905281812085905590518493508392507f692926c201c1a490c1553d7bd4d53beeae98652233db64a10ec99102aaadc9d39190a361139a3382612512565b6000546001600160a01b03163314611de55760405162461bcd60e51b81526004016106d090613035565b6001600160a01b038116611e4a5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016106d0565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160e01b03198216630271189760e51b148061067f575061067f82612651565b6000828152600e602052604081208054839290611ee890849061315c565b909155505060405181815282906001600160a01b038516907f6ad72273f2c6a083788e6d2e111a219924ac6344c1bd520d0b318eba5b5cb04a906020015b60405180910390a3505050565b6000908152600360205260409020546001600160a01b0316151590565b600081815260056020526040902080546001600160a01b0319166001600160a01b0384169081179091558190611f8582610f8f565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000611fc982611f33565b61202a5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016106d0565b600061203583610f8f565b9050806001600160a01b0316846001600160a01b031614806120705750836001600160a01b0316612065846107b0565b6001600160a01b0316145b806120a057506001600160a01b0380821660009081526006602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166120bb82610f8f565b6001600160a01b0316146121235760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016106d0565b6001600160a01b0382166121855760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016106d0565b612190838383612676565b61219b600082611f50565b6001600160a01b03831660009081526004602052604081208054600192906121c49084906131a7565b90915550506001600160a01b03821660009081526004602052604081208054600192906121f290849061315c565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b031614156122b55760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016106d0565b6001600160a01b03838116600081815260066020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319101611f26565b6123258484846120a8565b61233184848484612681565b61139a5760405162461bcd60e51b81526004016106d090612fe3565b606060405180606001604052806024815260200161330760249139905090565b6060816123915750506040805180820190915260018152600360fc1b602082015290565b8160005b81156123bb57806123a581613225565b91506123b49050600a83613174565b9150612395565b60008167ffffffffffffffff8111156123d6576123d66132c9565b6040519080825280601f01601f191660200182016040528015612400576020820181803683370190505b5090505b84156120a0576124156001836131a7565b9150612422600a86613240565b61242d90603061315c565b60f81b818381518110612442576124426132b3565b60200101906001600160f81b031916908160001a905350612464600a86613174565b9450612404565b600061247682610f8f565b905061248481600084612676565b61248f600083611f50565b6001600160a01b03811660009081526004602052604081208054600192906124b89084906131a7565b909155505060008281526003602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6001600160a01b0382166125685760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016106d0565b61257181611f33565b156125be5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016106d0565b6125ca60008383612676565b6001600160a01b03821660009081526004602052604081208054600192906125f390849061315c565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b60006001600160e01b0319821663780e9d6360e01b148061067f575061067f8261278e565b6109498383836127de565b60006001600160a01b0384163b1561278357604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906126c5903390899088908890600401612f93565b602060405180830381600087803b1580156126df57600080fd5b505af192505050801561270f575060408051601f3d908101601f1916820190925261270c91810190612e18565b60015b612769573d80801561273d576040519150601f19603f3d011682016040523d82523d6000602084013e612742565b606091505b5080516127615760405162461bcd60e51b81526004016106d090612fe3565b805181602001fd5b6001600160e01b031916630a85bd0160e11b1490506120a0565b506001949350505050565b60006001600160e01b031982166380ac58cd60e01b14806127bf57506001600160e01b03198216635b5e139f60e01b145b8061067f57506301ffc9a760e01b6001600160e01b031983161461067f565b6001600160a01b0383166128395761283481600980546000838152600a60205260408120829055600182018355919091527f6e1540171b6c0c960b71a7020d9f60077f6af931a8bbf590da0223dacf75c7af0155565b61285c565b816001600160a01b0316836001600160a01b03161461285c5761285c8382612896565b6001600160a01b0382166128735761094981612933565b826001600160a01b0316826001600160a01b0316146109495761094982826129e2565b600060016128a384611006565b6128ad91906131a7565b600083815260086020526040902054909150808214612900576001600160a01b03841660009081526007602090815260408083208584528252808320548484528184208190558352600890915290208190555b5060009182526008602090815260408084208490556001600160a01b039094168352600781528383209183525290812055565b600954600090612945906001906131a7565b6000838152600a60205260408120546009805493945090928490811061296d5761296d6132b3565b90600052602060002001549050806009838154811061298e5761298e6132b3565b6000918252602080832090910192909255828152600a909152604080822084905585825281205560098054806129c6576129c661329d565b6001900381819060005260206000200160009055905550505050565b60006129ed83611006565b6001600160a01b039093166000908152600760209081526040808320868452825280832085905593825260089052919091209190915550565b80356001600160a01b0381168114612a3d57600080fd5b919050565b600082601f830112612a5357600080fd5b8135602067ffffffffffffffff821115612a6f57612a6f6132c9565b8160051b612a7e8282016130ea565b838152828101908684018388018501891015612a9957600080fd5b600093505b85841015612abc578035835260019390930192918401918401612a9e565b50979650505050505050565b600082601f830112612ad957600080fd5b813567ffffffffffffffff811115612af357612af36132c9565b612b06601f8201601f19166020016130ea565b818152846020838601011115612b1b57600080fd5b816020850160208301376000918101602001919091529392505050565b803560ff81168114612a3d57600080fd5b600060208284031215612b5b57600080fd5b61151182612a26565b60008060408385031215612b7757600080fd5b612b8083612a26565b9150612b8e60208401612a26565b90509250929050565b600080600080600060a08688031215612baf57600080fd5b612bb886612a26565b9450612bc660208701612a26565b9350604086013567ffffffffffffffff80821115612be357600080fd5b612bef89838a01612a42565b94506060880135915080821115612c0557600080fd5b612c1189838a01612a42565b93506080880135915080821115612c2757600080fd5b50612c3488828901612ac8565b9150509295509295909350565b600080600060608486031215612c5657600080fd5b612c5f84612a26565b9250612c6d60208501612a26565b9150604084013590509250925092565b60008060008060808587031215612c9357600080fd5b612c9c85612a26565b9350612caa60208601612a26565b925060408501359150606085013567ffffffffffffffff811115612ccd57600080fd5b612cd987828801612ac8565b91505092959194509250565b600080600080600060a08688031215612cfd57600080fd5b612d0686612a26565b9450612d1460208701612a26565b93506040860135925060608601359150608086013567ffffffffffffffff811115612d3e57600080fd5b612c3488828901612ac8565b60008060408385031215612d5d57600080fd5b612d6683612a26565b91506020830135612d76816132df565b809150509250929050565b60008060408385031215612d9457600080fd5b612d9d83612a26565b946020939093013593505050565b600080600060608486031215612dc057600080fd5b612dc984612a26565b95602085013595506040909401359392505050565b600060208284031215612df057600080fd5b8151611511816132df565b600060208284031215612e0d57600080fd5b8135611511816132f0565b600060208284031215612e2a57600080fd5b8151611511816132f0565b600060208284031215612e4757600080fd5b5035919050565b600060208284031215612e6057600080fd5b5051919050565b600080600060608486031215612e7c57600080fd5b83359250612e8c60208501612a26565b9150612e9a60408501612b38565b90509250925092565b60008060408385031215612eb657600080fd5b50508035926020909101359150565b600080600060608486031215612eda57600080fd5b505081359360208301359350604090920135919050565b600080600080600060a08688031215612f0957600080fd5b8535945060208601359350612f2060408701612b38565b94979396509394606081013594506080013592915050565b60008151808452612f508160208601602086016131be565b601f01601f19169290920160200192915050565b60008351612f768184602088016131be565b835190830190612f8a8183602088016131be565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090612fc690830184612f38565b9695505050505050565b6020815260006115116020830184612f38565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526015908201527421b637b732a73ab939b29d102337b93134b23232b760591b604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b604051601f8201601f1916810167ffffffffffffffff81118282101715613113576131136132c9565b604052919050565b600080821280156001600160ff1b038490038513161561313d5761313d613271565b600160ff1b839003841281161561315657613156613271565b50500190565b6000821982111561316f5761316f613271565b500190565b60008261318357613183613287565b500490565b60008160001904831182151516156131a2576131a2613271565b500290565b6000828210156131b9576131b9613271565b500390565b60005b838110156131d95781810151838201526020016131c1565b8381111561139a5750506000910152565b600181811c908216806131fe57607f821691505b6020821081141561321f57634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561323957613239613271565b5060010190565b60008261324f5761324f613287565b500690565b6000600160ff1b82141561326a5761326a613271565b5060000390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b80151581146132ed57600080fd5b50565b6001600160e01b0319811681146132ed57600080fdfe68747470733a2f2f6170692e6d616964636f696e2e6f72672f636c6f6e656e757273652fa26469706673582212204746f7d3f8b8e4d578c1b6be0555b7e6c764bb827ffb1c5b770f46dd11d2419264736f6c63430008050033";
//# sourceMappingURL=CloneNurse__factory.js.map