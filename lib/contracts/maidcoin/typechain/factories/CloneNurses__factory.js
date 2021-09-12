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
            {
                internalType: "uint256",
                name: "lifetime",
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
                name: "id",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "parts",
                type: "uint256",
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
const _bytecode = "0x60e06040526019600f553480156200001657600080fd5b5060405162003ab038038062003ab083398101604081905262000039916200020a565b6040518060400160405280601581526020017f4d616964436f696e20436c6f6e65204e7572736573000000000000000000000081525060405180604001604052806007815260200166434e555253455360c81b8152506000620000a16200016060201b60201c565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35081516200010090600190602085019062000164565b5080516200011690600290602084019062000164565b505050606093841b6001600160601b031990811660805292841b831660a052921b1660c052601080546001600160a01b0319166001600160a01b03909216919091179055620002c8565b3390565b828054620001729062000272565b90600052602060002090601f016020900481019282620001965760008555620001e1565b82601f10620001b157805160ff1916838001178555620001e1565b82800160010185558215620001e1579182015b82811115620001e1578251825591602001919060010190620001c4565b50620001ef929150620001f3565b5090565b5b80821115620001ef5760008155600101620001f4565b600080600080608085870312156200022157600080fd5b84516200022e81620002af565b60208601519094506200024181620002af565b60408601519093506200025481620002af565b60608601519092506200026781620002af565b939692955090935050565b600181811c908216806200028757607f821691505b60208210811415620002a957634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b0381168114620002c557600080fd5b50565b60805160601c60a05160601c60c05160601c61372a62000386600039600081816104620152818161070901528181610a3b01528181610dbb0152818161109c015281816115a6015281816118c701528181611c200152611e0e0152600081816104a401528181610ff40152818161111601528181611b7a01528181611c9b0152818161272701526127ae01526000818161051d01528181610c5801528181610ce0015281816117490152818161203f01526120c7015261372a6000f3fe608060405234801561001057600080fd5b50600436106102695760003560e01c8063715018a611610151578063c05bd473116100c3578063e3a9405111610087578063e3a940511461061c578063e985e9c51461062f578063f23a6e611461066b578063f2fde38b1461068a578063f4e795b01461069d578063fa600f76146106b057600080fd5b8063c05bd4731461059d578063c87b56dd146105b0578063cd5a146e146105c3578063ddfeacca146105f6578063e2e784d51461060957600080fd5b806395d89b411161011557806395d89b41146104fd578063a22cb46514610505578063b24606b814610518578063b252144a1461053f578063b88d4fde14610552578063bc197c811461056557600080fd5b8063715018a614610497578063849e5aff1461049f57806385887622146104c65780638da5cb5b146104d95780639222ce8c146104ea57600080fd5b806323b872dd116101ea578063379607f5116101ae578063379607f5146103f65780633a64e0d11461040957806342842e0e146104375780636352211e1461044a578063671104c91461045d57806370a082311461048457600080fd5b806323b872dd1461038a5780632a55205a1461039d5780632b2269b8146103b05780632b76a356146103d05780632f745c59146103e357600080fd5b8063095ea7b311610231578063095ea7b31461031a57806311b9e6b21461032f57806312f7086c1461034f57806318160ddd14610362578063184935c11461036a57600080fd5b806301ffc9a71461026e57806303273bc714610296578063060f1938146102c857806306fdde03146102da578063081812fc146102ef575b600080fd5b61028161027c366004613197565b6106d0565b60405190151581526020015b60405180910390f35b6102a96102a4366004613203565b6106fb565b604080516001600160a01b03909316835260208301919091520161028d565b600d545b60405190815260200161028d565b6102e2610794565b60405161028d91906133b4565b6103026102fd3660046131d1565b610826565b6040516001600160a01b03909116815260200161028d565b61032d61032836600461311d565b6108ae565b005b6102cc61033d3660046131d1565b600b6020526000908152604090205481565b6102cc61035d3660046131d1565b6109c4565b600e546102cc565b6102cc6103783660046131d1565b600c6020526000908152604090205481565b61032d610398366004612fdd565b610b5c565b6102a96103ab36600461323f565b610b8d565b6102cc6103be3660046131d1565b60096020526000908152604090205481565b61032d6103de36600461323f565b610bc7565b6102cc6103f136600461311d565b610f0d565b61032d6104043660046131d1565b610fa3565b61041c6104173660046131d1565b6111b9565b6040805193845260208401929092529082015260600161028d565b61032d610445366004612fdd565b6111ec565b6103026104583660046131d1565b611207565b6103027f000000000000000000000000000000000000000000000000000000000000000081565b6102cc610492366004612ee5565b61127e565b61032d611305565b6103027f000000000000000000000000000000000000000000000000000000000000000081565b6102cc6104d4366004613261565b611379565b6000546001600160a01b0316610302565b6102a96104f8366004612ee5565b611477565b6102e261157d565b61032d6105133660046130e6565b61158c565b6103027f000000000000000000000000000000000000000000000000000000000000000081565b61032d61054d366004613147565b61159b565b61032d610560366004613019565b6116de565b610584610573366004612f33565b63bc197c8160e01b95945050505050565b6040516001600160e01b0319909116815260200161028d565b61032d6105ab366004613293565b611710565b6102e26105be3660046131d1565b6117b7565b6105d66105d13660046131d1565b611882565b60408051948552602085019390935291830152606082015260800161028d565b61032d61060436600461311d565b6118bc565b61032d61061736600461311d565b6119e3565b61032d61062a36600461323f565b611a33565b61028161063d366004612f00565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205460ff1690565b610584610679366004613081565b63f23a6e6160e01b95945050505050565b61032d610698366004612ee5565b611e84565b61032d6106ab36600461323f565b611f6e565b6102cc6106be366004612ee5565b600a6020526000908152604090205481565b600063152a902d60e11b6001600160e01b0319831614806106f557506106f58261218c565b92915050565b600080336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461074f5760405162461bcd60e51b815260040161074690613419565b60405180910390fd5b606461075e60ff85168761356d565b6107689190613559565b90506000811561078b5761077b85611477565b909350905061078b8582846121b1565b50935093915050565b6060600180546107a3906135cf565b80601f01602080910402602001604051908101604052809291908181526020018280546107cf906135cf565b801561081c5780601f106107f15761010080835404028352916020019161081c565b820191906000526020600020905b8154815290600101906020018083116107ff57829003601f168201915b5050505050905090565b60006108318261221a565b6108925760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610746565b506000908152600560205260409020546001600160a01b031690565b60006108b982611207565b9050806001600160a01b0316836001600160a01b031614156109275760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610746565b336001600160a01b03821614806109435750610943813361063d565b6109b55760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610746565b6109bf8383612237565b505050565b60006109cf8261221a565b610a1b5760405162461bcd60e51b815260206004820152601760248201527f436c6f6e654e75727365733a20496e76616c69642069640000000000000000006044820152606401610746565b604051633185c0bd60e01b815260026004820152602481018390526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690633185c0bd9060440160206040518083038186803b158015610a8557600080fd5b505afa158015610a99573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610abd91906131ea565b905080610acd5750600092915050565b6000600e8481548110610ae257610ae261367c565b90600052602060002090600302019050600081600101549050600082600201549050808211610b175750600095945050505050565b43821015610b4e57610b29824361358c565b610b33828461358c565b610b3d908661356d565b610b479190613559565b9450610b52565b8394505b5050505b50919050565b610b6633826122a5565b610b825760405162461bcd60e51b81526004016107469061347e565b6109bf83838361238f565b601054600f5460009182916001600160a01b03909116906103e890610bb2908661356d565b610bbc9190613559565b915091509250929050565b6000600d8381548110610bdc57610bdc61367c565b60009182526020909120600490910201805490915080831015610c415760405162461bcd60e51b815260206004820152601d60248201527f436c6f6e654e75727365733a204e6f7420656e6f7567682070617274730000006044820152606401610746565b604051637921219560e11b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063f242432a90610c9390339030908990899060040161337c565b600060405180830381600087803b158015610cad57600080fd5b505af1158015610cc1573d6000803e3d6000fd5b505060405163b390c0ab60e01b815260048101879052602481018690527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316925063b390c0ab9150604401600060405180830381600087803b158015610d2e57600080fd5b505af1158015610d42573d6000803e3d6000fd5b505050506000600182610d55919061358c565b610d6060018661358c565b8460030154610d6f919061356d565b610d799190613559565b610d839043613541565b90506000610d90600e5490565b600285810154604051625777c560e11b815260048101929092526024820152604481018290529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169062aeef8a90606401600060405180830381600087803b158015610e0657600080fd5b505af1158015610e1a573d6000803e3d6000fd5b505060408051606081018252898152602080820187815243838501908152600e8054600181018255600091825294517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3fd60039096029586015591517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3fe850155517fbb7b4a454dc3493923482f07822329ed19e8244eff582cc204f8554c3620c3ff909301929092558582526009905281812085905590518493508392507f692926c201c1a490c1553d7bd4d53beeae98652233db64a10ec99102aaadc9d39190a3610f05338261253a565b505050505050565b6000610f188361127e565b8210610f7a5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b6064820152608401610746565b506001600160a01b03919091166000908152600760209081526040808320938352929052205490565b610fac81611207565b6001600160a01b0316336001600160a01b031614610fdc5760405162461bcd60e51b815260040161074690613419565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a082319060240160206040518083038186803b15801561103e57600080fd5b505afa158015611052573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061107691906131ea565b604051625777c560e11b81526002600482015260006024820152604481018490529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169062aeef8a90606401600060405180830381600087803b1580156110e757600080fd5b505af11580156110fb573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691506370a082319060240160206040518083038186803b15801561116157600080fd5b505afa158015611175573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061119991906131ea565b905060006111a7838361358c565b90506111b38482612679565b50505050565b600e81815481106111c957600080fd5b600091825260209091206003909102018054600182015460029092015490925083565b6109bf838383604051806020016040528060008152506116de565b6000818152600360205260408120546001600160a01b0316806106f55760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610746565b60006001600160a01b0382166112e95760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610746565b506001600160a01b031660009081526004602052604090205490565b6000546001600160a01b0316331461132f5760405162461bcd60e51b815260040161074690613449565b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b600080546001600160a01b031633146113a45760405162461bcd60e51b815260040161074690613449565b50600d805460408051608081018252968752602087019586528601938452606086019283526001810182556000919091529351600485027fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb581019190915592517fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb684015590517fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb7830155517fd7b6990105719101dabeb77144f2a3385c8033acd3af97e9423a695e81ad1eb89091015590565b6001600160a01b0381166000908152600a60209081526040808320548084526009909252822054829190808214156114bd576114b282611207565b959194509092505050565b815b8282146114dd576000828152600960205260409020549192506114bf565b6001600160a01b0386166000908152600a60209081526040808320869055838352600990915280822085905551849183917f692926c201c1a490c1553d7bd4d53beeae98652233db64a10ec99102aaadc9d39190a360405183906001600160a01b038816907f74afd1219e1106da193179db213370f587f8a6893614bd79eae534375ba60b9a90600090a361157183611207565b96929550919350505050565b6060600280546107a3906135cf565b61159733838361287a565b5050565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146115e35760405162461bcd60e51b815260040161074690613419565b6115ec8261221a565b6116385760405162461bcd60e51b815260206004820152601b60248201527f436c6f6e654e75727365733a20496e76616c69642074617267657400000000006044820152606401610746565b6001600160a01b0383166000818152600a6020526040808220859055518492917f74afd1219e1106da193179db213370f587f8a6893614bd79eae534375ba60b9a91a380156109bf576000828152600b60205260408120805483929061169f908490613541565b909155505060405181815282907f95dbced4d615bf88768e343c98d3d10cd6458a8fab8cc8a1b5ae9cb6916773659060200160405180910390a2505050565b6116e833836122a5565b6117045760405162461bcd60e51b81526004016107469061347e565b6111b384848484612941565b60405163090c278560e31b81523360048201523060248201526044810185905260ff841660648201526084810183905260a481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906348613c289060c401600060405180830381600087803b15801561179557600080fd5b505af11580156117a9573d6000803e3d6000fd5b50505050610f058686610bc7565b60606117c28261221a565b6118265760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610746565b6000611830612974565b90506000815111611850576040518060200160405280600081525061187b565b8061185a84612994565b60405160200161186b929190613310565b6040516020818303038152906040525b9392505050565b600d818154811061189257600080fd5b60009182526020909120600490910201805460018201546002830154600390930154919350919084565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146119045760405162461bcd60e51b815260040161074690613419565b600061190f83611477565b6000818152600b60205260408120549193509091508312156119835761193483613633565b8112156119835760405162461bcd60e51b815260206004820152601c60248201527f436c6f6e654e75727365733a204f757472616e67656420706f776572000000006044820152606401610746565b61198d8382613500565b6000838152600b6020526040908190208290555190915082907f95dbced4d615bf88768e343c98d3d10cd6458a8fab8cc8a1b5ae9cb691677365906119d59086815260200190565b60405180910390a250505050565b6000546001600160a01b03163314611a0d5760405162461bcd60e51b815260040161074690613449565b601080546001600160a01b0319166001600160a01b039390931692909217909155600f55565b81811415611a835760405162461bcd60e51b815260206004820152601d60248201527f436c6f6e654e75727365733a20496e76616c69642069642c20746f49640000006044820152606401610746565b611a8c82611207565b6001600160a01b0316336001600160a01b031614611abc5760405162461bcd60e51b815260040161074690613419565b611ac58161221a565b611b115760405162461bcd60e51b815260206004820152601960248201527f436c6f6e654e75727365733a20496e76616c696420746f4964000000000000006044820152606401610746565b6000600d600e8481548110611b2857611b2861367c565b90600052602060002090600302016000015481548110611b4a57611b4a61367c565b6000918252602082206040516370a0823160e01b8152306004828101919091529092020192506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906370a082319060240160206040518083038186803b158015611bbc57600080fd5b505afa158015611bd0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bf491906131ea565b60028381015460405163a41fe49f60e01b815260048101929092526024820152604481018690529091507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a41fe49f90606401600060405180830381600087803b158015611c6c57600080fd5b505af1158015611c80573d6000803e3d6000fd5b50506040516370a0823160e01b8152306004820152600092507f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031691506370a082319060240160206040518083038186803b158015611ce657600080fd5b505afa158015611cfa573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d1e91906131ea565b90506000611d2c838361358c565b9050611d388682612679565b60008681526009602052604080822087905551869188917f692926c201c1a490c1553d7bd4d53beeae98652233db64a10ec99102aaadc9d39190a36000868152600b602052604080822054878352908220805491928392611d9a908490613541565b90915550506000878152600b6020526040808220919091555186907f95dbced4d615bf88768e343c98d3d10cd6458a8fab8cc8a1b5ae9cb69167736590611de49084815260200190565b60405180910390a260018501546040516340c10f1960e01b815233600482015260248101919091527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906340c10f1990604401600060405180830381600087803b158015611e5a57600080fd5b505af1158015611e6e573d6000803e3d6000fd5b50505050611e7b87612a92565b50505050505050565b6000546001600160a01b03163314611eae5760405162461bcd60e51b815260040161074690613449565b6001600160a01b038116611f135760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610746565b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b60008111611fcc5760405162461bcd60e51b815260206004820152602560248201527f436c6f6e654e75727365733a20496e76616c696420616d6f756e7473206f6620604482015264706172747360d81b6064820152608401610746565b6000600e8381548110611fe157611fe161367c565b906000526020600020906003020190506000816000015490506000600d828154811061200f5761200f61367c565b9060005260206000209060040201905061202885610fa3565b604051637921219560e11b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063f242432a9061207a903390309087908a9060040161337c565b600060405180830381600087803b15801561209457600080fd5b505af11580156120a8573d6000803e3d6000fd5b505060405163b390c0ab60e01b815260048101859052602481018790527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316925063b390c0ab9150604401600060405180830381600087803b15801561211557600080fd5b505af1158015612129573d6000803e3d6000fd5b5050505060018301546000438210612142575080612145565b50435b82546000906121569060019061358c565b878560030154612166919061356d565b6121709190613559565b61217a9083613541565b60019096019590955550505050505050565b60006001600160e01b03198216630271189760e51b14806106f557506106f582612b39565b6000828152600c6020526040812080548392906121cf908490613541565b909155505060405181815282906001600160a01b038516907f6ad72273f2c6a083788e6d2e111a219924ac6344c1bd520d0b318eba5b5cb04a906020015b60405180910390a3505050565b6000908152600360205260409020546001600160a01b0316151590565b600081815260056020526040902080546001600160a01b0319166001600160a01b038416908117909155819061226c82611207565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006122b08261221a565b6123115760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610746565b600061231c83611207565b9050806001600160a01b0316846001600160a01b031614806123575750836001600160a01b031661234c84610826565b6001600160a01b0316145b8061238757506001600160a01b0380821660009081526006602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166123a282611207565b6001600160a01b03161461240a5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b6064820152608401610746565b6001600160a01b03821661246c5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610746565b612477838383612b89565b612482600082612237565b6001600160a01b03831660009081526004602052604081208054600192906124ab90849061358c565b90915550506001600160a01b03821660009081526004602052604081208054600192906124d9908490613541565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6001600160a01b0382166125905760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610746565b6125998161221a565b156125e65760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610746565b6125f260008383612b89565b6001600160a01b038216600090815260046020526040812080546001929061261b908490613541565b909155505060008181526003602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b80612682575050565b6000600e83815481106126975761269761367c565b600091825260208220600160039092020190810154600282015491935091808284116126c55785915061270b565b43841015612708576126d7844361358c565b6126e1848661358c565b6126eb908861356d565b6126f59190613559565b9050612701818761358c565b915061270b565b50845b811561278c57604051630852cd8d60e31b8152600481018390527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906342966c6890602401600060405180830381600087803b15801561277357600080fd5b505af1158015612787573d6000803e3d6000fd5b505050505b80156128345760405163a9059cbb60e01b8152336004820152602481018290527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a9059cbb90604401602060405180830381600087803b1580156127fa57600080fd5b505af115801561280e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612832919061317a565b505b436002860155604051818152339088907f3ed1528b0fdc7c5207c1bf935e34a667e13656b9ed165260c522be0bc544f3039060200160405180910390a350505050505050565b816001600160a01b0316836001600160a01b031614156128dc5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610746565b6001600160a01b03838116600081815260066020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910161220d565b61294c84848461238f565b61295884848484612b94565b6111b35760405162461bcd60e51b8152600401610746906133c7565b60606040518060600160405280602581526020016136d060259139905090565b6060816129b85750506040805180820190915260018152600360fc1b602082015290565b8160005b81156129e257806129cc81613604565b91506129db9050600a83613559565b91506129bc565b60008167ffffffffffffffff8111156129fd576129fd613692565b6040519080825280601f01601f191660200182016040528015612a27576020820181803683370190505b5090505b841561238757612a3c60018361358c565b9150612a49600a8661361f565b612a54906030613541565b60f81b818381518110612a6957612a6961367c565b60200101906001600160f81b031916908160001a905350612a8b600a86613559565b9450612a2b565b6000612a9d82611207565b9050612aab81600084612b89565b612ab6600083612237565b6001600160a01b0381166000908152600460205260408120805460019290612adf90849061358c565b909155505060008281526003602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b60006001600160e01b031982166380ac58cd60e01b1480612b6a57506001600160e01b03198216635b5e139f60e01b145b806106f557506301ffc9a760e01b6001600160e01b03198316146106f5565b6109bf838383612ca1565b60006001600160a01b0384163b15612c9657604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290612bd890339089908890889060040161333f565b602060405180830381600087803b158015612bf257600080fd5b505af1925050508015612c22575060408051601f3d908101601f19168201909252612c1f918101906131b4565b60015b612c7c573d808015612c50576040519150601f19603f3d011682016040523d82523d6000602084013e612c55565b606091505b508051612c745760405162461bcd60e51b8152600401610746906133c7565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050612387565b506001949350505050565b6001600160a01b038316612cb9576109bf8282612ce1565b6001600160a01b038216612cd1576109bf8382612d25565b612cdb8382612d25565b6109bf82825b6000612cec8361127e565b6001600160a01b039093166000908152600760209081526040808320868452825280832085905593825260089052919091209190915550565b60006001612d328461127e565b612d3c919061358c565b600083815260086020526040902054909150808214612d8f576001600160a01b03841660009081526007602090815260408083208584528252808320548484528184208190558352600890915290208190555b5060009182526008602090815260408084208490556001600160a01b039094168352600781528383209183525290812055565b80356001600160a01b0381168114612dd957600080fd5b919050565b600082601f830112612def57600080fd5b8135602067ffffffffffffffff821115612e0b57612e0b613692565b8160051b612e1a8282016134cf565b838152828101908684018388018501891015612e3557600080fd5b600093505b85841015612e58578035835260019390930192918401918401612e3a565b50979650505050505050565b600082601f830112612e7557600080fd5b813567ffffffffffffffff811115612e8f57612e8f613692565b612ea2601f8201601f19166020016134cf565b818152846020838601011115612eb757600080fd5b816020850160208301376000918101602001919091529392505050565b803560ff81168114612dd957600080fd5b600060208284031215612ef757600080fd5b61187b82612dc2565b60008060408385031215612f1357600080fd5b612f1c83612dc2565b9150612f2a60208401612dc2565b90509250929050565b600080600080600060a08688031215612f4b57600080fd5b612f5486612dc2565b9450612f6260208701612dc2565b9350604086013567ffffffffffffffff80821115612f7f57600080fd5b612f8b89838a01612dde565b94506060880135915080821115612fa157600080fd5b612fad89838a01612dde565b93506080880135915080821115612fc357600080fd5b50612fd088828901612e64565b9150509295509295909350565b600080600060608486031215612ff257600080fd5b612ffb84612dc2565b925061300960208501612dc2565b9150604084013590509250925092565b6000806000806080858703121561302f57600080fd5b61303885612dc2565b935061304660208601612dc2565b925060408501359150606085013567ffffffffffffffff81111561306957600080fd5b61307587828801612e64565b91505092959194509250565b600080600080600060a0868803121561309957600080fd5b6130a286612dc2565b94506130b060208701612dc2565b93506040860135925060608601359150608086013567ffffffffffffffff8111156130da57600080fd5b612fd088828901612e64565b600080604083850312156130f957600080fd5b61310283612dc2565b91506020830135613112816136a8565b809150509250929050565b6000806040838503121561313057600080fd5b61313983612dc2565b946020939093013593505050565b60008060006060848603121561315c57600080fd5b61316584612dc2565b95602085013595506040909401359392505050565b60006020828403121561318c57600080fd5b815161187b816136a8565b6000602082840312156131a957600080fd5b813561187b816136b9565b6000602082840312156131c657600080fd5b815161187b816136b9565b6000602082840312156131e357600080fd5b5035919050565b6000602082840312156131fc57600080fd5b5051919050565b60008060006060848603121561321857600080fd5b8335925061322860208501612dc2565b915061323660408501612ed4565b90509250925092565b6000806040838503121561325257600080fd5b50508035926020909101359150565b6000806000806080858703121561327757600080fd5b5050823594602084013594506040840135936060013592509050565b60008060008060008060c087890312156132ac57600080fd5b8635955060208701359450604087013593506132ca60608801612ed4565b92506080870135915060a087013590509295509295509295565b600081518084526132fc8160208601602086016135a3565b601f01601f19169290920160200192915050565b600083516133228184602088016135a3565b8351908301906133368183602088016135a3565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090613372908301846132e4565b9695505050505050565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b60208152600061187b60208301846132e4565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526016908201527521b637b732a73ab939b2b99d102337b93134b23232b760511b604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b604051601f8201601f1916810167ffffffffffffffff811182821017156134f8576134f8613692565b604052919050565b600080821280156001600160ff1b038490038513161561352257613522613650565b600160ff1b839003841281161561353b5761353b613650565b50500190565b6000821982111561355457613554613650565b500190565b60008261356857613568613666565b500490565b600081600019048311821515161561358757613587613650565b500290565b60008282101561359e5761359e613650565b500390565b60005b838110156135be5781810151838201526020016135a6565b838111156111b35750506000910152565b600181811c908216806135e357607f821691505b60208210811415610b5657634e487b7160e01b600052602260045260246000fd5b600060001982141561361857613618613650565b5060010190565b60008261362e5761362e613666565b500690565b6000600160ff1b82141561364957613649613650565b5060000390565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b80151581146136b657600080fd5b50565b6001600160e01b0319811681146136b657600080fdfe68747470733a2f2f6170692e6d616964636f696e2e6f72672f636c6f6e656e75727365732fa26469706673582212201054546dd43807e0711738278a309506c07e41d1b05d1e89c08b513d494fba3264736f6c63430008050033";
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