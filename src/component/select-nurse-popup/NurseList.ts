import { DomNode } from "@hanul/skynode";
import { constants } from "ethers";
import SkyUtil from "skyutil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import Nurse from "./Nurse";

export default class NurseList extends DomNode {

    constructor() {
        super(".nurse-list");
        this.loadAllNurses();
    }

    public async loadAllNurses() {

        const nurseCount = await CloneNursesContract.getTotalSupply();

        this.empty();
        SkyUtil.repeat(nurseCount.toNumber(), async (nurseId) => {
            const owner = await CloneNursesContract.ownerOf(nurseId);
            if (owner !== constants.AddressZero) {
                new Nurse(nurseId, owner).appendTo(this);
            }
        });
    }

    public async find(owner: string) {

        const nurseCount = await CloneNursesContract.balanceOf(owner);

        this.empty();
        SkyUtil.repeat(nurseCount.toNumber(), async (index) => {
            const nurseId = await CloneNursesContract.getTokenOfOwnerByIndex(owner, index);
            new Nurse(nurseId.toNumber(), owner).appendTo(this);
        });
    }
}
