/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { IRewardCalculator } from "../IRewardCalculator";

export class IRewardCalculator__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRewardCalculator {
    return new Contract(address, _abi, signerOrProvider) as IRewardCalculator;
  }
}

const _abi = [
  {
    inputs: [],
    name: "rewardPerBlock",
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
];
