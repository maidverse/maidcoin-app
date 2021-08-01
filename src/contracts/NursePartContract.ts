import Config from "../Config";
import NursePartArtifact from "./artifacts/contracts/NursePart.sol/NursePart.json";
import ERC1155Contract from "./standard/ERC1155Contract";
import { NursePart } from "./typechain";

class NursePartContract extends ERC1155Contract<NursePart> {

    constructor() {
        super(Config.contracts.NursePart, NursePartArtifact.abi, []);
    }
}

export default new NursePartContract();
