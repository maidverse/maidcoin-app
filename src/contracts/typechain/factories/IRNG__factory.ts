/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IRNG } from "../IRNG";

export class IRNG__factory {
  static connect(address: string, signerOrProvider: Signer | Provider): IRNG {
    return new Contract(address, _abi, signerOrProvider) as IRNG;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "seed",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "generateRandomNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];
