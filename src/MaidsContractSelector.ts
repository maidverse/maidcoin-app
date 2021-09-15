import LingerieGirlsContract from "./contracts/LingerieGirlsContract";
import MaidsContract from "./contracts/MaidsContract";
import ERC721Contract from "./contracts/standard/ERC721Contract";
import SushiGirlsContract from "./contracts/SushiGirlsContract";

class MaidsContractSelector {

    public typeToAddress(type: string) {
        if (type === "Maid") {
            return MaidsContract.address;
        } else if (type === "LingerieGirl") {
            return LingerieGirlsContract.address;
        } else if (type === "SushiGirl") {
            return SushiGirlsContract.address;
        }
    }

    public addressToContract(address: string): void | ERC721Contract<any> {
        if (address === MaidsContract.address) {
            return MaidsContract;
        } else if (address === LingerieGirlsContract.address) {
            return LingerieGirlsContract;
        } else if (address === SushiGirlsContract.address) {
            return SushiGirlsContract;
        }
    }
}

export default new MaidsContractSelector();
