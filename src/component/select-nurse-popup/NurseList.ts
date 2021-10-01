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

        const nurseCount = (await CloneNursesContract.getTotalSupply()).toNumber();

        this.empty();
        SkyUtil.repeat(nurseCount > 100 ? 100 : nurseCount, async (nurseId) => {
            setTimeout(async () => {
                if (this.deleted !== true) {
                    const owner = await CloneNursesContract.ownerOf(nurseId);
                    if (owner !== constants.AddressZero) {
                        const nurse = new Nurse(nurseId, owner).appendTo(this);
                        nurse.toss("support", this);
                    }
                }
            }, nurseId * 50);
        });
    }

    public async find(owner: string) {

        const nurseCount = (await CloneNursesContract.balanceOf(owner)).toNumber();

        this.empty();
        SkyUtil.repeat(nurseCount > 100 ? 100 : nurseCount, async (index) => {
            setTimeout(async () => {
                if (this.deleted !== true) {
                    const nurseId = await CloneNursesContract.getTokenOfOwnerByIndex(owner, index);
                    const nurse = new Nurse(nurseId.toNumber(), owner).appendTo(this);
                    nurse.toss("support", this);
                }
            }, index * 50);
        });
    }
}
