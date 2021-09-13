import { DomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import Nurse from "./Nurse";

export default class NurseList extends DomNode {

    constructor() {
        super(".nurse-list");
        this.loadNurses();
    }

    private async loadNurses() {

        const nurseCount = await CloneNursesContract.getTotalSupply();

        SkyUtil.repeat(nurseCount.toNumber(), async (nurseId) => {
            new Nurse(nurseId).appendTo(this);
        });
    }
}
