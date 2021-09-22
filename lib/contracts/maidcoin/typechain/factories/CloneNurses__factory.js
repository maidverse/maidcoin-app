"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloneNurses__factory = void 0;
const ethers_1 = require("ethers");
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
            {
                internalType: "address",
                name: "_royaltyReceiver",
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
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "rechargedLifetime",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "lastEndBlock",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "newEndBlock",
                type: "uint256",
            },
        ],
        name: "ElongateLifetime",
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
                internalType: "uint256[]",
                name: "partCounts",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "destroyReturns",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "powers",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "lifetimes",
                type: "uint256[]",
            },
        ],
        name: "addNurseType",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
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
            {
                internalType: "uint256",
                name: "_parts",
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
                name: "_parts",
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
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
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
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "toIds",
                type: "uint256[]",
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
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "parts",
                type: "uint256[]",
            },
        ],
        name: "elongateLifetime",
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
        name: "exists",
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
                internalType: "address",
                name: "supporter",
                type: "address",
            },
        ],
        name: "findSupportingTo",
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
            {
                internalType: "uint256",
                name: "lifetime",
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
            {
                internalType: "uint256",
                name: "endBlock",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "lastClaimedBlock",
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
                name: "claimableReward",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_salePrice",
                type: "uint256",
            },
        ],
        name: "royaltyInfo",
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
                name: "_receiver",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_royaltyFee",
                type: "uint256",
            },
        ],
        name: "setRoyaltyInfo",
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
const _bytecode = "0x6101006040526019600f553480156200001757600080fd5b50604051620043f2380380620043f28339810160408190526200003a916200028c565b6040518060400160405280601581526020017f4d616964436f696e20436c6f6e65204e7572736573000000000000000000000081525060405180604001604052806007815260200166434e555253455360c81b8152506000620000a2620001e260201b60201c565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350815162000101906001906020850190620001e6565b50805162000117906002906020840190620001e6565b5050506001600160601b0319606085811b821660805284811b821660a05283901b1660c052601080546001600160a01b038381166001600160a01b031990921691909117909155604080516348cd4cb160e01b81529051918416916348cd4cb191600480820192602092909190829003018186803b1580156200019957600080fd5b505afa158015620001ae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620001d49190620002f4565b60e052506200036492505050565b3390565b828054620001f4906200030e565b90600052602060002090601f01602090048101928262000218576000855562000263565b82601f106200023357805160ff191683800117855562000263565b8280016001018555821562000263579182015b828111156200026357825182559160200191906001019062000246565b506200027192915062000275565b5090565b5b8082111562000271576000815560010162000276565b60008060008060808587031215620002a357600080fd5b8451620002b0816200034b565b6020860151909450620002c3816200034b565b6040860151909350620002d6816200034b565b6060860151909250620002e9816200034b565b939692955090935050565b6000602082840312156200030757600080fd5b5051919050565b600181811c908216806200032357607f821691505b602082108114156200034557634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b03811681146200036157600080fd5b50565b60805160601c60a05160601c60c05160601c60e051613fbf6200043360003960008181611138015261115f01526000818161048b01528181610aca01528181610df3015281816111cb015281816115af01528181611e2501528181611fb2015281816122b301526125e20152600081816104f3015281816115290152818161166e01528181611da701528181611ee801528181612dd30152612e5a01526000818161058c015281816108900152818161092c0152818161101101528181611099015261245c0152613fbf6000f3fe608060405234801561001057600080fd5b506004361061027f5760003560e01c806370a082311161015c578063b252144a116100ce578063ddfeacca11610087578063ddfeacca14610665578063e2e784d514610678578063e985e9c51461068b578063f23a6e61146106c7578063f2fde38b146106e6578063fa600f76146106f957600080fd5b8063b252144a146105ae578063b88d4fde146105c1578063bc197c81146105d4578063c05bd4731461060c578063c87b56dd1461061f578063cd5a146e1461063257600080fd5b80639222ce8c116101205780639222ce8c1461052657806395d89b41146105395780639b88772a14610541578063a0881f7614610554578063a22cb46514610574578063b24606b81461058757600080fd5b806370a08231146104c0578063715018a6146104d357806378f210d5146104db578063849e5aff146104ee5780638da5cb5b1461051557600080fd5b806323b872dd116101f55780633a64e0d1116101b95780633a64e0d11461041f57806342842e0e1461044d5780634f558e79146104605780636352211e14610473578063671104c9146104865780636ba4c138146104ad57600080fd5b806323b872dd146103b35780632a55205a146103c65780632b2269b8146103d95780632b76a356146103f95780632f745c591461040c57600080fd5b8063081812fc11610247578063081812fc1461031a578063095ea7b31461034557806311b9e6b21461035857806312f7086c1461037857806318160ddd1461038b578063184935c11461039357600080fd5b806301ffc9a714610284578063031391ab146102ac57806303273bc7146102c1578063060f1938146102f357806306fdde0314610305575b600080fd5b6102976102923660046139fa565b610719565b60405190151581526020015b60405180910390f35b6102bf6102ba3660046138ad565b610744565b005b6102d46102cf366004613a66565b610abc565b604080516001600160a01b0390931683526020830191909152016102a3565b600d545b6040519081526020016102a3565b61030d610b4c565b6040516102a39190613c29565b61032d610328366004613a34565b610bde565b6040516001600160a01b0390911681526020016102a3565b6102bf61035336600461380e565b610c66565b6102f7610366366004613a34565b600b6020526000908152604090205481565b6102f7610386366004613a34565b610d7c565b600e546102f7565b6102f76103a1366004613a34565b600c6020526000908152604090205481565b6102bf6103c13660046136ce565b610f14565b6102d46103d4366004613aa2565b610f45565b6102f76103e7366004613a34565b60096020526000908152604090205481565b6102bf610407366004613aa2565b610f80565b6102f761041a36600461380e565b61134f565b61043261042d366004613a34565b6113e5565b604080519384526020840192909252908201526060016102a3565b6102bf61045b3660046136ce565b611418565b61029761046e366004613a34565b611433565b61032d610481366004613a34565b61143e565b61032d7f000000000000000000000000000000000000000000000000000000000000000081565b6102bf6104bb36600461386b565b6114b5565b6102f76104ce3660046135d6565b61173a565b6102bf6117c1565b6102d46104e93660046135d6565b611835565b61032d7f000000000000000000000000000000000000000000000000000000000000000081565b6000546001600160a01b031661032d565b6102d46105343660046135d6565b6118b0565b61030d61198d565b6102bf61054f3660046138ad565b61199c565b610567610562366004613919565b6120a4565b6040516102a39190613be5565b6102bf6105823660046137d7565b612299565b61032d7f000000000000000000000000000000000000000000000000000000000000000081565b6102bf6105bc366004613838565b6122a8565b6102bf6105cf36600461370a565b6123eb565b6105f36105e2366004613624565b63bc197c8160e01b95945050505050565b6040516001600160e01b031990911681526020016102a3565b6102bf61061a366004613ac4565b612423565b61030d61062d366004613a34565b6124d2565b610645610640366004613a34565b61259d565b6040805194855260208501939093529183015260608201526080016102a3565b6102bf61067336600461380e565b6125d7565b6102bf61068636600461380e565b6126fe565b6102976106993660046135f1565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205460ff1690565b6105f36106d5366004613772565b63f23a6e6160e01b95945050505050565b6102bf6106f43660046135d6565b61274e565b6102f76107073660046135d6565b600a6020526000908152604090205481565b600063152a902d60e11b6001600160e01b03198316148061073e575061073e82612838565b92915050565b8281146107985760405162461bcd60e51b815260206004820152601f60248201527f436c6f6e654e75727365733a20496e76616c696420706172616d65746572730060448201526064015b60405180910390fd5b6107a284846114b5565b60005b83811015610ab55760008383838181106107c1576107c1613ef1565b90506020020135116108235760405162461bcd60e51b815260206004820152602560248201527f436c6f6e654e75727365733a20496e76616c696420616d6f756e7473206f6620604482015264706172747360d81b606482015260840161078f565b6000600e86868481811061083957610839613ef1565b905060200201358154811061085057610850613ef1565b906000526020600020906003020190506000816000015490506000600d828154811061087e5761087e613ef1565b906000526020600020906004020190507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663f242432a3330858a8a8a8181106108d2576108d2613ef1565b905060200201356040518563ffffffff1660e01b81526004016108f89493929190613bad565b600060405180830381600087803b15801561091257600080fd5b505af1158015610926573d6000803e3d6000fd5b505050507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663b390c0ab8388888881811061096c5761096c613ef1565b905060200201356040518363ffffffff1660e01b8152600401610999929190918252602082015260400190565b600060405180830381600087803b1580156109b357600080fd5b505af11580156109c7573d6000803e3d6000fd5b50505050600183015460004382106109e05750806109e3565b50435b82546000906109f490600190613e01565b898989818110610a0657610a06613ef1565b905060200201358560030154610a1c9190613de2565b610a269190613dce565b90506000610a348284613db6565b6001880181905590508b8b89818110610a4f57610a4f613ef1565b6040805186815260208181018a905291810186905291029290920135917ffbf31c722190fd99a8f65945bdc9f3fdd80ea90e908f3bc77f1feeef21684397915060600160405180910390a250505050505050600181610aae9190613db6565b90506107a5565b5050505050565b600080336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610b075760405162461bcd60e51b815260040161078f90613c8e565b6064610b1660ff851687613de2565b610b209190613dce565b905060008115610b4357610b33856118b0565b9093509050610b4385828461285d565b50935093915050565b606060018054610b5b90613e44565b80601f0160208091040260200160405190810160405280929190818152602001828054610b8790613e44565b8015610bd45780601f10610ba957610100808354040283529160200191610bd4565b820191906000526020600020905b815481529060010190602001808311610bb757829003601f168201915b5050505050905090565b6000610be9826128c6565b610c4a5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b606482015260840161078f565b506000908152600560205260409020546001600160a01b031690565b6000610c718261143e565b9050806001600160a01b0316836001600160a01b03161415610cdf5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b606482015260840161078f565b336001600160a01b0382161480610cfb5750610cfb8133610699565b610d6d5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000606482015260840161078f565b610d7783836128e3565b505050565b6000610d87826128c6565b610dd35760405162461bcd60e51b815260206004820152601760248201527f436c6f6e654e75727365733a20496e76616c6964206964000000000000000000604482015260640161078f565b604051633185c0bd60e01b815260026004820152602481018390526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690633185c0bd9060440160206040518083038186803b158015610e3d57600080fd5b505afa158015610e51573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e759190613a4d565b905080610e855750600092915050565b6000600e8481548110610e9a57610e9a613ef1565b90600052602060002090600302019050600081600101549050600082600201549050808211610ecf5750600095945050505050565b43821015610f0657610ee18143613e01565b610eeb8284613e01565b610ef59086613de2565b610eff9190613dce565b9450610f0a565b8394505b5050505b50919050565b610f1e3382612951565b610f3a5760405162461bcd60e51b815260040161078f90613cf3565b610d77838383612a3b565b601054600f5460009182916001600160a01b03909116906103e890610f6a9086613de2565b610f749190613dce565b915091505b9250929050565b6000600d8381548110610f9557610f95613ef1565b60009182526020909120600490910201805490915080831015610ffa5760405162461bcd60e51b815260206004820152601d60248201527f436c6f6e654e75727365733a204e6f7420656e6f756768207061727473000000604482015260640161078f565b604051637921219560e11b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063f242432a9061104c903390309089908990600401613bad565b600060405180830381600087803b15801561106657600080fd5b505af115801561107a573d6000803e3d6000fd5b505060405163b390c0ab60e01b815260048101879052602481018690527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316925063b390c0ab9150604401600060405180830381600087803b1580156110e757600080fd5b505af11580156110fb573d6000803e3d6000fd5b50505050600060018261110e9190613e01565b611119600186613e01565b84600301546111289190613de2565b6111329190613dce565b905060007f00000000000000000000000000000000000000000000000000000000000000004311611183577f0000000000000000000000000000000000000000000000000000000000000000611185565b435b905060006111938383613db6565b905060006111a0600e5490565b600287810154604051625777c560e11b815260048101929092526024820152604481018290529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169062aeef8a90606401600060405180830381600087803b15801561121657600080fd5b505af115801561122a573d6000803e3d6000fd5b5050604080516060810182528b81526020808201878152828401898152600e8054600181018255600091825294517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3fd60039096029586015591517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3fe850155517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3ff90930192909255858252600990528181208590559051849350839250600080516020613f458339815191529190a36113023382612be6565b604080518581526000602082015290810183905281907ffbf31c722190fd99a8f65945bdc9f3fdd80ea90e908f3bc77f1feeef216843979060600160405180910390a25050505050505050565b600061135a8361173a565b82106113bc5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b606482015260840161078f565b506001600160a01b03919091166000908152600760209081526040808320938352929052205490565b600e81815481106113f557600080fd5b600091825260209091206003909102018054600182015460029092015490925083565b610d77838383604051806020016040528060008152506123eb565b600061073e826128c6565b6000818152600360205260408120546001600160a01b03168061073e5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b606482015260840161078f565b60005b81811015610d77576114e18383838181106114d5576114d5613ef1565b9050602002013561143e565b6001600160a01b0316336001600160a01b0316146115115760405162461bcd60e51b815260040161078f90613c8e565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b15801561157357600080fd5b505afa158015611587573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ab9190613a4d565b90507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031662aeef8a600260008787878181106115f1576115f1613ef1565b6040516001600160e01b031960e088901b1681526004810195909552602485019390935250602090910201356044820152606401600060405180830381600087803b15801561163f57600080fd5b505af1158015611653573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691506370a082319060240160206040518083038186803b1580156116b957600080fd5b505afa1580156116cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116f19190613a4d565b905060006116ff8383613e01565b905061172386868681811061171657611716613ef1565b9050602002013582612d25565b5050506001816117339190613db6565b90506114b8565b60006001600160a01b0382166117a55760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b606482015260840161078f565b506001600160a01b031660009081526004602052604090205490565b6000546001600160a01b031633146117eb5760405162461bcd60e51b815260040161078f90613cbe565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6001600160a01b0381166000908152600a602090815260408083205480845260099092528220548291908082141561187b576118708261143e565b959194509092505050565b815b82821461189b5760008281526009602052604090205491925061187d565b6118a48361143e565b96929550919350505050565b6001600160a01b0381166000908152600a60209081526040808320548084526009909252822054829190808214156118eb576118708261143e565b815b82821461190b576000828152600960205260409020549192506118ed565b6001600160a01b0386166000908152600a6020908152604080832086905583835260099091528082208590555184918391600080516020613f458339815191529190a360405183906001600160a01b038816907f74afd1219e1106da193179db213370f587f8a6893614bd79eae534375ba60b9a90600090a36118a48361143e565b606060028054610b5b90613e44565b8281146119eb5760405162461bcd60e51b815260206004820152601f60248201527f436c6f6e654e75727365733a20496e76616c696420706172616d657465727300604482015260640161078f565b60005b83811015610ab557611a0b8585838181106114d5576114d5613ef1565b6001600160a01b0316336001600160a01b031614611a3b5760405162461bcd60e51b815260040161078f90613c8e565b6000600b6000878785818110611a5357611a53613ef1565b9050602002013581526020019081526020016000205490508060001415611ae15760001960096000888886818110611a8d57611a8d613ef1565b90506020020135815260200190815260200160002081905550600019868684818110611abb57611abb613ef1565b90506020020135600080516020613f4583398151915260405160405180910390a3611d26565b858583818110611af357611af3613ef1565b90506020020135848484818110611b0c57611b0c613ef1565b905060200201351415611b615760405162461bcd60e51b815260206004820152601d60248201527f436c6f6e654e75727365733a20496e76616c69642069642c20746f4964000000604482015260640161078f565b611b82848484818110611b7657611b76613ef1565b905060200201356128c6565b611bce5760405162461bcd60e51b815260206004820152601960248201527f436c6f6e654e75727365733a20496e76616c696420746f496400000000000000604482015260640161078f565b838383818110611be057611be0613ef1565b9050602002013560096000888886818110611bfd57611bfd613ef1565b90506020020135815260200190815260200160002081905550838383818110611c2857611c28613ef1565b90506020020135868684818110611c4157611c41613ef1565b90506020020135600080516020613f4583398151915260405160405180910390a380600b6000868686818110611c7957611c79613ef1565b9050602002013581526020019081526020016000206000828254611c9d9190613db6565b9091555060009050600b81888886818110611cba57611cba613ef1565b90506020020135815260200190815260200160002081905550838383818110611ce557611ce5613ef1565b905060200201357f95dbced4d615bf88768e343c98d3d10cd6458a8fab8cc8a1b5ae9cb69167736582604051611d1d91815260200190565b60405180910390a25b6000600d600e888886818110611d3e57611d3e613ef1565b9050602002013581548110611d5557611d55613ef1565b90600052602060002090600302016000015481548110611d7757611d77613ef1565b6000918252602082206040516370a0823160e01b8152306004828101919091529092020192506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906370a082319060240160206040518083038186803b158015611de957600080fd5b505afa158015611dfd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e219190613a4d565b90507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663a41fe49f600284600201548b8b89818110611e6b57611e6b613ef1565b6040516001600160e01b031960e088901b1681526004810195909552602485019390935250602090910201356044820152606401600060405180830381600087803b158015611eb957600080fd5b505af1158015611ecd573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691506370a082319060240160206040518083038186803b158015611f3357600080fd5b505afa158015611f47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f6b9190613a4d565b90506000611f798383613e01565b9050611f908a8a8881811061171657611716613ef1565b60018401546040516340c10f1960e01b815233600482015260248101919091527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906340c10f1990604401600060405180830381600087803b158015611ffe57600080fd5b505af1158015612012573d6000803e3d6000fd5b505050506120378a8a8881811061202b5761202b613ef1565b90506020020135612f26565b600e8a8a8881811061204b5761204b613ef1565b905060200201358154811061206257612062613ef1565b9060005260206000209060030201600080820160009055600182016000905560028201600090555050505050505060018161209d9190613db6565b90506119ee565b6000546060906001600160a01b031633146120d15760405162461bcd60e51b815260040161078f90613cbe565b600d5460008967ffffffffffffffff8111156120ef576120ef613f07565b604051908082528060200260200182016040528015612118578160200160208202803683370190505b50905060005b8a81101561228a5760018c8c8381811061213a5761213a613ef1565b905060200201351161218e5760405162461bcd60e51b815260206004820152601e60248201527f436c6f6e654e75727365733a20496e76616c69642070617274436f756e740000604482015260640161078f565b600d60405180608001604052808e8e858181106121ad576121ad613ef1565b9050602002013581526020018c8c858181106121cb576121cb613ef1565b9050602002013581526020018a8a858181106121e9576121e9613ef1565b90506020020135815260200188888581811061220757612207613ef1565b602090810292909201359092528354600181810186556000958652948290208451600490920201908155908301519381019390935550604081015160028301556060015160039091015561225b8184613db6565b82828151811061226d5761226d613ef1565b6020908102919091010152612283600182613db6565b905061211e565b509a9950505050505050505050565b6122a4338383612fcd565b5050565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146122f05760405162461bcd60e51b815260040161078f90613c8e565b6122f9826128c6565b6123455760405162461bcd60e51b815260206004820152601b60248201527f436c6f6e654e75727365733a20496e76616c6964207461726765740000000000604482015260640161078f565b6001600160a01b0383166000818152600a6020526040808220859055518492917f74afd1219e1106da193179db213370f587f8a6893614bd79eae534375ba60b9a91a38015610d77576000828152600b6020526040812080548392906123ac908490613db6565b909155505060405181815282907f95dbced4d615bf88768e343c98d3d10cd6458a8fab8cc8a1b5ae9cb6916773659060200160405180910390a2505050565b6123f53383612951565b6124115760405162461bcd60e51b815260040161078f90613cf3565b61241d84848484613094565b50505050565b60405163090c278560e31b81523360048201523060248201526044810185905260ff841660648201526084810183905260a481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906348613c289060c401600060405180830381600087803b1580156124a857600080fd5b505af11580156124bc573d6000803e3d6000fd5b505050506124ca8686610f80565b505050505050565b60606124dd826128c6565b6125415760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b606482015260840161078f565b600061254b6130c7565b9050600081511161256b5760405180602001604052806000815250612596565b80612575846130e7565b604051602001612586929190613b41565b6040516020818303038152906040525b9392505050565b600d81815481106125ad57600080fd5b60009182526020909120600490910201805460018201546002830154600390930154919350919084565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461261f5760405162461bcd60e51b815260040161078f90613c8e565b600061262a836118b0565b6000818152600b602052604081205491935090915083121561269e5761264f83613ea8565b81121561269e5760405162461bcd60e51b815260206004820152601c60248201527f436c6f6e654e75727365733a204f757472616e67656420706f77657200000000604482015260640161078f565b6126a88382613d75565b6000838152600b6020526040908190208290555190915082907f95dbced4d615bf88768e343c98d3d10cd6458a8fab8cc8a1b5ae9cb691677365906126f09086815260200190565b60405180910390a250505050565b6000546001600160a01b031633146127285760405162461bcd60e51b815260040161078f90613cbe565b601080546001600160a01b0319166001600160a01b039390931692909217909155600f55565b6000546001600160a01b031633146127785760405162461bcd60e51b815260040161078f90613cbe565b6001600160a01b0381166127dd5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161078f565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b60006001600160e01b03198216630271189760e51b148061073e575061073e826131e5565b6000828152600c60205260408120805483929061287b908490613db6565b909155505060405181815282906001600160a01b038516907f6ad72273f2c6a083788e6d2e111a219924ac6344c1bd520d0b318eba5b5cb04a906020015b60405180910390a3505050565b6000908152600360205260409020546001600160a01b0316151590565b600081815260056020526040902080546001600160a01b0319166001600160a01b03841690811790915581906129188261143e565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b600061295c826128c6565b6129bd5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b606482015260840161078f565b60006129c88361143e565b9050806001600160a01b0316846001600160a01b03161480612a035750836001600160a01b03166129f884610bde565b6001600160a01b0316145b80612a3357506001600160a01b0380821660009081526006602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316612a4e8261143e565b6001600160a01b031614612ab65760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b606482015260840161078f565b6001600160a01b038216612b185760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161078f565b612b23838383613235565b612b2e6000826128e3565b6001600160a01b0383166000908152600460205260408120805460019290612b57908490613e01565b90915550506001600160a01b0382166000908152600460205260408120805460019290612b85908490613db6565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b038216612c3c5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161078f565b612c45816128c6565b15612c925760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161078f565b612c9e60008383613235565b6001600160a01b0382166000908152600460205260408120805460019290612cc7908490613db6565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b80612d2e575050565b6000600e8381548110612d4357612d43613ef1565b60009182526020822060016003909202019081015460028201549193509180828411612d7157859150612db7565b43841015612db457612d838343613e01565b612d8d8486613e01565b612d979088613de2565b612da19190613dce565b9050612dad8187613e01565b9150612db7565b50845b8115612e3857604051630852cd8d60e31b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906342966c6890602401600060405180830381600087803b158015612e1f57600080fd5b505af1158015612e33573d6000803e3d6000fd5b505050505b8015612ee05760405163a9059cbb60e01b8152336004820152602481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a9059cbb90604401602060405180830381600087803b158015612ea657600080fd5b505af1158015612eba573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ede91906139dd565b505b436002860155604051818152339088907f3ed1528b0fdc7c5207c1bf935e34a667e13656b9ed165260c522be0bc544f3039060200160405180910390a350505050505050565b6000612f318261143e565b9050612f3f81600084613235565b612f4a6000836128e3565b6001600160a01b0381166000908152600460205260408120805460019290612f73908490613e01565b909155505060008281526003602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b816001600160a01b0316836001600160a01b0316141561302f5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161078f565b6001600160a01b03838116600081815260066020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3191016128b9565b61309f848484612a3b565b6130ab84848484613240565b61241d5760405162461bcd60e51b815260040161078f90613c3c565b6060604051806060016040528060258152602001613f6560259139905090565b60608161310b5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115613135578061311f81613e79565b915061312e9050600a83613dce565b915061310f565b60008167ffffffffffffffff81111561315057613150613f07565b6040519080825280601f01601f19166020018201604052801561317a576020820181803683370190505b5090505b8415612a335761318f600183613e01565b915061319c600a86613e94565b6131a7906030613db6565b60f81b8183815181106131bc576131bc613ef1565b60200101906001600160f81b031916908160001a9053506131de600a86613dce565b945061317e565b60006001600160e01b031982166380ac58cd60e01b148061321657506001600160e01b03198216635b5e139f60e01b145b8061073e57506301ffc9a760e01b6001600160e01b031983161461073e565b610d7783838361334d565b60006001600160a01b0384163b1561334257604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290613284903390899088908890600401613b70565b602060405180830381600087803b15801561329e57600080fd5b505af19250505080156132ce575060408051601f3d908101601f191682019092526132cb91810190613a17565b60015b613328573d8080156132fc576040519150601f19603f3d011682016040523d82523d6000602084013e613301565b606091505b5080516133205760405162461bcd60e51b815260040161078f90613c3c565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050612a33565b506001949350505050565b6001600160a01b03831661336557610d77828261338d565b6001600160a01b03821661337d57610d7783826133d1565b61338783826133d1565b610d7782825b60006133988361173a565b6001600160a01b039093166000908152600760209081526040808320868452825280832085905593825260089052919091209190915550565b600060016133de8461173a565b6133e89190613e01565b60008381526008602052604090205490915080821461343b576001600160a01b03841660009081526007602090815260408083208584528252808320548484528184208190558352600890915290208190555b5060009182526008602090815260408084208490556001600160a01b039094168352600781528383209183525290812055565b80356001600160a01b038116811461348557600080fd5b919050565b60008083601f84011261349c57600080fd5b50813567ffffffffffffffff8111156134b457600080fd5b6020830191508360208260051b8501011115610f7957600080fd5b600082601f8301126134e057600080fd5b8135602067ffffffffffffffff8211156134fc576134fc613f07565b8160051b61350b828201613d44565b83815282810190868401838801850189101561352657600080fd5b600093505b8584101561354957803583526001939093019291840191840161352b565b50979650505050505050565b600082601f83011261356657600080fd5b813567ffffffffffffffff81111561358057613580613f07565b613593601f8201601f1916602001613d44565b8181528460208386010111156135a857600080fd5b816020850160208301376000918101602001919091529392505050565b803560ff8116811461348557600080fd5b6000602082840312156135e857600080fd5b6125968261346e565b6000806040838503121561360457600080fd5b61360d8361346e565b915061361b6020840161346e565b90509250929050565b600080600080600060a0868803121561363c57600080fd5b6136458661346e565b94506136536020870161346e565b9350604086013567ffffffffffffffff8082111561367057600080fd5b61367c89838a016134cf565b9450606088013591508082111561369257600080fd5b61369e89838a016134cf565b935060808801359150808211156136b457600080fd5b506136c188828901613555565b9150509295509295909350565b6000806000606084860312156136e357600080fd5b6136ec8461346e565b92506136fa6020850161346e565b9150604084013590509250925092565b6000806000806080858703121561372057600080fd5b6137298561346e565b93506137376020860161346e565b925060408501359150606085013567ffffffffffffffff81111561375a57600080fd5b61376687828801613555565b91505092959194509250565b600080600080600060a0868803121561378a57600080fd5b6137938661346e565b94506137a16020870161346e565b93506040860135925060608601359150608086013567ffffffffffffffff8111156137cb57600080fd5b6136c188828901613555565b600080604083850312156137ea57600080fd5b6137f38361346e565b9150602083013561380381613f1d565b809150509250929050565b6000806040838503121561382157600080fd5b61382a8361346e565b946020939093013593505050565b60008060006060848603121561384d57600080fd5b6138568461346e565b95602085013595506040909401359392505050565b6000806020838503121561387e57600080fd5b823567ffffffffffffffff81111561389557600080fd5b6138a18582860161348a565b90969095509350505050565b600080600080604085870312156138c357600080fd5b843567ffffffffffffffff808211156138db57600080fd5b6138e78883890161348a565b9096509450602087013591508082111561390057600080fd5b5061390d8782880161348a565b95989497509550505050565b6000806000806000806000806080898b03121561393557600080fd5b883567ffffffffffffffff8082111561394d57600080fd5b6139598c838d0161348a565b909a50985060208b013591508082111561397257600080fd5b61397e8c838d0161348a565b909850965060408b013591508082111561399757600080fd5b6139a38c838d0161348a565b909650945060608b01359150808211156139bc57600080fd5b506139c98b828c0161348a565b999c989b5096995094979396929594505050565b6000602082840312156139ef57600080fd5b815161259681613f1d565b600060208284031215613a0c57600080fd5b813561259681613f2e565b600060208284031215613a2957600080fd5b815161259681613f2e565b600060208284031215613a4657600080fd5b5035919050565b600060208284031215613a5f57600080fd5b5051919050565b600080600060608486031215613a7b57600080fd5b83359250613a8b6020850161346e565b9150613a99604085016135c5565b90509250925092565b60008060408385031215613ab557600080fd5b50508035926020909101359150565b60008060008060008060c08789031215613add57600080fd5b863595506020870135945060408701359350613afb606088016135c5565b92506080870135915060a087013590509295509295509295565b60008151808452613b2d816020860160208601613e18565b601f01601f19169290920160200192915050565b60008351613b53818460208801613e18565b835190830190613b67818360208801613e18565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090613ba390830184613b15565b9695505050505050565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6020808252825182820181905260009190848201906040850190845b81811015613c1d57835183529284019291840191600101613c01565b50909695505050505050565b6020815260006125966020830184613b15565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526016908201527521b637b732a73ab939b2b99d102337b93134b23232b760511b604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b604051601f8201601f1916810167ffffffffffffffff81118282101715613d6d57613d6d613f07565b604052919050565b600080821280156001600160ff1b0384900385131615613d9757613d97613ec5565b600160ff1b8390038412811615613db057613db0613ec5565b50500190565b60008219821115613dc957613dc9613ec5565b500190565b600082613ddd57613ddd613edb565b500490565b6000816000190483118215151615613dfc57613dfc613ec5565b500290565b600082821015613e1357613e13613ec5565b500390565b60005b83811015613e33578181015183820152602001613e1b565b8381111561241d5750506000910152565b600181811c90821680613e5857607f821691505b60208210811415610f0e57634e487b7160e01b600052602260045260246000fd5b6000600019821415613e8d57613e8d613ec5565b5060010190565b600082613ea357613ea3613edb565b500690565b6000600160ff1b821415613ebe57613ebe613ec5565b5060000390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b8015158114613f2b57600080fd5b50565b6001600160e01b031981168114613f2b57600080fdfe692926c201c1a490c1553d7bd4d53beeae98652233db64a10ec99102aaadc9d368747470733a2f2f6170692e6d616964636f696e2e6f72672f636c6f6e656e75727365732fa26469706673582212200812d57ad2113838090ee10e110abadbd8ffeb960ced61c89d9781b96a3753e364736f6c63430008050033";
class CloneNurses__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_nursePart, _maidCoin, _theMaster, _royaltyReceiver, overrides) {
        return super.deploy(_nursePart, _maidCoin, _theMaster, _royaltyReceiver, overrides || {});
    }
    getDeployTransaction(_nursePart, _maidCoin, _theMaster, _royaltyReceiver, overrides) {
        return super.getDeployTransaction(_nursePart, _maidCoin, _theMaster, _royaltyReceiver, overrides || {});
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
exports.CloneNurses__factory = CloneNurses__factory;
CloneNurses__factory.bytecode = _bytecode;
CloneNurses__factory.abi = _abi;
//# sourceMappingURL=CloneNurses__factory.js.map