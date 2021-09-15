import ERC721Contract from "./contracts/standard/ERC721Contract";
declare class MaidsContractSelector {
    typeToAddress(type: string): string | undefined;
    addressToContract(address: string): void | ERC721Contract<any>;
}
declare const _default: MaidsContractSelector;
export default _default;
//# sourceMappingURL=MaidsContractSelector.d.ts.map