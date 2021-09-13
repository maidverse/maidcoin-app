/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface NurseRaidInterface extends ethers.utils.Interface {
  functions: {
    "approveMaids(address[])": FunctionFragment;
    "challengers(uint256,address)": FunctionFragment;
    "changeMaidEfficacy(uint256,uint256)": FunctionFragment;
    "changeRNG(address)": FunctionFragment;
    "checkDone(uint256)": FunctionFragment;
    "create(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "disapproveMaids(address[])": FunctionFragment;
    "enter(uint256,address,uint256)": FunctionFragment;
    "enterWithPermitAll(uint256,address,uint256,uint256,uint8,bytes32,bytes32,uint8,bytes32,bytes32)": FunctionFragment;
    "exit(uint256)": FunctionFragment;
    "isMaidsApproved(address)": FunctionFragment;
    "maidCafe()": FunctionFragment;
    "maidCoin()": FunctionFragment;
    "maidEfficacy()": FunctionFragment;
    "nursePart()": FunctionFragment;
    "owner()": FunctionFragment;
    "raidCount()": FunctionFragment;
    "raids(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "rng()": FunctionFragment;
    "setMaidCafe(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "approveMaids",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "challengers",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "changeMaidEfficacy",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "changeRNG", values: [string]): string;
  encodeFunctionData(
    functionFragment: "checkDone",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "create",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "disapproveMaids",
    values: [string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "enter",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "enterWithPermitAll",
    values: [
      BigNumberish,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "exit", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "isMaidsApproved",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "maidCafe", values?: undefined): string;
  encodeFunctionData(functionFragment: "maidCoin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "maidEfficacy",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "nursePart", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "raidCount", values?: undefined): string;
  encodeFunctionData(functionFragment: "raids", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "rng", values?: undefined): string;
  encodeFunctionData(functionFragment: "setMaidCafe", values: [string]): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveMaids",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "challengers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "changeMaidEfficacy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "changeRNG", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "checkDone", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "create", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "disapproveMaids",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "enter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "enterWithPermitAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isMaidsApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "maidCafe", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "maidCoin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "maidEfficacy",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "nursePart", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "raidCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "raids", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rng", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setMaidCafe",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "ChangeMaidEfficacy(uint256,uint256)": EventFragment;
    "Create(uint256,uint256,uint256,uint256,uint256,uint256)": EventFragment;
    "Enter(address,uint256,address,uint256)": EventFragment;
    "Exit(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ChangeMaidEfficacy"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Create"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Enter"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Exit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export class NurseRaid extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: NurseRaidInterface;

  functions: {
    approveMaids(
      maids: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    challengers(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber] & {
        enterBlock: BigNumber;
        maids: string;
        maidId: BigNumber;
      }
    >;

    changeMaidEfficacy(
      _numerator: BigNumberish,
      _denominator: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    changeRNG(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    checkDone(id: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;

    create(
      entranceFee: BigNumberish,
      _nursePart: BigNumberish,
      maxRewardCount: BigNumberish,
      duration: BigNumberish,
      endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    disapproveMaids(
      maids: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    enter(
      id: BigNumberish,
      maids: string,
      maidId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    enterWithPermitAll(
      id: BigNumberish,
      maids: string,
      maidId: BigNumberish,
      deadline: BigNumberish,
      v1: BigNumberish,
      r1: BytesLike,
      s1: BytesLike,
      v2: BigNumberish,
      r2: BytesLike,
      s2: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    exit(
      id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isMaidsApproved(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    maidCafe(overrides?: CallOverrides): Promise<[string]>;

    maidCoin(overrides?: CallOverrides): Promise<[string]>;

    maidEfficacy(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { numerator: BigNumber; denominator: BigNumber }
    >;

    nursePart(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    raidCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    raids(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        entranceFee: BigNumber;
        nursePart: BigNumber;
        maxRewardCount: BigNumber;
        duration: BigNumber;
        endBlock: BigNumber;
      }
    >;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rng(overrides?: CallOverrides): Promise<[string]>;

    setMaidCafe(
      _maidCafe: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  approveMaids(
    maids: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  challengers(
    arg0: BigNumberish,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, string, BigNumber] & {
      enterBlock: BigNumber;
      maids: string;
      maidId: BigNumber;
    }
  >;

  changeMaidEfficacy(
    _numerator: BigNumberish,
    _denominator: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  changeRNG(
    addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  checkDone(id: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

  create(
    entranceFee: BigNumberish,
    _nursePart: BigNumberish,
    maxRewardCount: BigNumberish,
    duration: BigNumberish,
    endBlock: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  disapproveMaids(
    maids: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  enter(
    id: BigNumberish,
    maids: string,
    maidId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  enterWithPermitAll(
    id: BigNumberish,
    maids: string,
    maidId: BigNumberish,
    deadline: BigNumberish,
    v1: BigNumberish,
    r1: BytesLike,
    s1: BytesLike,
    v2: BigNumberish,
    r2: BytesLike,
    s2: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  exit(
    id: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isMaidsApproved(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  maidCafe(overrides?: CallOverrides): Promise<string>;

  maidCoin(overrides?: CallOverrides): Promise<string>;

  maidEfficacy(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { numerator: BigNumber; denominator: BigNumber }
  >;

  nursePart(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  raidCount(overrides?: CallOverrides): Promise<BigNumber>;

  raids(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
      entranceFee: BigNumber;
      nursePart: BigNumber;
      maxRewardCount: BigNumber;
      duration: BigNumber;
      endBlock: BigNumber;
    }
  >;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rng(overrides?: CallOverrides): Promise<string>;

  setMaidCafe(
    _maidCafe: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approveMaids(maids: string[], overrides?: CallOverrides): Promise<void>;

    challengers(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, string, BigNumber] & {
        enterBlock: BigNumber;
        maids: string;
        maidId: BigNumber;
      }
    >;

    changeMaidEfficacy(
      _numerator: BigNumberish,
      _denominator: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    changeRNG(addr: string, overrides?: CallOverrides): Promise<void>;

    checkDone(id: BigNumberish, overrides?: CallOverrides): Promise<boolean>;

    create(
      entranceFee: BigNumberish,
      _nursePart: BigNumberish,
      maxRewardCount: BigNumberish,
      duration: BigNumberish,
      endBlock: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    disapproveMaids(maids: string[], overrides?: CallOverrides): Promise<void>;

    enter(
      id: BigNumberish,
      maids: string,
      maidId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    enterWithPermitAll(
      id: BigNumberish,
      maids: string,
      maidId: BigNumberish,
      deadline: BigNumberish,
      v1: BigNumberish,
      r1: BytesLike,
      s1: BytesLike,
      v2: BigNumberish,
      r2: BytesLike,
      s2: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    exit(id: BigNumberish, overrides?: CallOverrides): Promise<void>;

    isMaidsApproved(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    maidCafe(overrides?: CallOverrides): Promise<string>;

    maidCoin(overrides?: CallOverrides): Promise<string>;

    maidEfficacy(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { numerator: BigNumber; denominator: BigNumber }
    >;

    nursePart(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    raidCount(overrides?: CallOverrides): Promise<BigNumber>;

    raids(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
        entranceFee: BigNumber;
        nursePart: BigNumber;
        maxRewardCount: BigNumber;
        duration: BigNumber;
        endBlock: BigNumber;
      }
    >;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    rng(overrides?: CallOverrides): Promise<string>;

    setMaidCafe(_maidCafe: string, overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    ChangeMaidEfficacy(
      numerator?: null,
      denominator?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { numerator: BigNumber; denominator: BigNumber }
    >;

    Create(
      id?: BigNumberish | null,
      entranceFee?: null,
      nursePart?: BigNumberish | null,
      maxRewardCount?: null,
      duration?: null,
      endBlock?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        id: BigNumber;
        entranceFee: BigNumber;
        nursePart: BigNumber;
        maxRewardCount: BigNumber;
        duration: BigNumber;
        endBlock: BigNumber;
      }
    >;

    Enter(
      challenger?: string | null,
      id?: BigNumberish | null,
      maids?: string | null,
      maidId?: null
    ): TypedEventFilter<
      [string, BigNumber, string, BigNumber],
      { challenger: string; id: BigNumber; maids: string; maidId: BigNumber }
    >;

    Exit(
      challenger?: string | null,
      id?: BigNumberish | null
    ): TypedEventFilter<
      [string, BigNumber],
      { challenger: string; id: BigNumber }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    approveMaids(
      maids: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    challengers(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    changeMaidEfficacy(
      _numerator: BigNumberish,
      _denominator: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    changeRNG(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    checkDone(id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    create(
      entranceFee: BigNumberish,
      _nursePart: BigNumberish,
      maxRewardCount: BigNumberish,
      duration: BigNumberish,
      endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    disapproveMaids(
      maids: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    enter(
      id: BigNumberish,
      maids: string,
      maidId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    enterWithPermitAll(
      id: BigNumberish,
      maids: string,
      maidId: BigNumberish,
      deadline: BigNumberish,
      v1: BigNumberish,
      r1: BytesLike,
      s1: BytesLike,
      v2: BigNumberish,
      r2: BytesLike,
      s2: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    exit(
      id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isMaidsApproved(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maidCafe(overrides?: CallOverrides): Promise<BigNumber>;

    maidCoin(overrides?: CallOverrides): Promise<BigNumber>;

    maidEfficacy(overrides?: CallOverrides): Promise<BigNumber>;

    nursePart(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    raidCount(overrides?: CallOverrides): Promise<BigNumber>;

    raids(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rng(overrides?: CallOverrides): Promise<BigNumber>;

    setMaidCafe(
      _maidCafe: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approveMaids(
      maids: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    challengers(
      arg0: BigNumberish,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    changeMaidEfficacy(
      _numerator: BigNumberish,
      _denominator: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    changeRNG(
      addr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    checkDone(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    create(
      entranceFee: BigNumberish,
      _nursePart: BigNumberish,
      maxRewardCount: BigNumberish,
      duration: BigNumberish,
      endBlock: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    disapproveMaids(
      maids: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    enter(
      id: BigNumberish,
      maids: string,
      maidId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    enterWithPermitAll(
      id: BigNumberish,
      maids: string,
      maidId: BigNumberish,
      deadline: BigNumberish,
      v1: BigNumberish,
      r1: BytesLike,
      s1: BytesLike,
      v2: BigNumberish,
      r2: BytesLike,
      s2: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    exit(
      id: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isMaidsApproved(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maidCafe(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maidCoin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maidEfficacy(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nursePart(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    raidCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    raids(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rng(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setMaidCafe(
      _maidCafe: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}