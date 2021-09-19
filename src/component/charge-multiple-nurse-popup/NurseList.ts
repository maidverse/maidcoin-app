import { DomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import Nurse from "./Nurse";

export default class NurseList extends DomNode {

    constructor() {
        super(".nurse-list");
        this.loadAllNurses();
    }

    public get partCounts(): { [nurseId: number]: number } {
        const partCounts: { [nurseId: number]: number } = {};
        for (const child of this.children) {
            if (child instanceof Nurse) {
                partCounts[child.nurseId] = child.partCount;
            }
        }
        return partCounts;
    }

    public async loadAllNurses() {

        const nurseCount = await CloneNursesContract.getTotalSupply();

        this.empty();
        SkyUtil.repeat(nurseCount.toNumber(), async (nurseId) => {
            new Nurse(nurseId).appendTo(this);
        });
    }

    public async find(owner: string) {

        const nurseCount = await CloneNursesContract.balanceOf(owner);

        this.empty();
        SkyUtil.repeat(nurseCount.toNumber(), async (index) => {
            const nurseId = await CloneNursesContract.getTokenOfOwnerByIndex(owner, index);
            new Nurse(nurseId.toNumber()).appendTo(this);
        });
    }
}
