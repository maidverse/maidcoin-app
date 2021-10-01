import { BigNumber } from "@ethersproject/bignumber";
import { DomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import Wallet from "../../ethereum/Wallet";
import Nurse from "./Nurse";

export default class NurseList extends DomNode {

    public checkedNurseIds: number[] = [];
    public totalSelectedSupportedPower: BigNumber = BigNumber.from(0);
    public totalDestroyReturn: BigNumber = BigNumber.from(0);

    constructor() {
        super(".nurse-list");
        this.loadAllNurses();
    }

    public async loadAllNurses() {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const nurseCount = (await CloneNursesContract.balanceOf(owner)).toNumber();

            this.empty();
            SkyUtil.repeat(nurseCount > 100 ? 100 : nurseCount, (index) => {
                setTimeout(async () => {
                    if (this.deleted !== true) {
                        const nurseId = await CloneNursesContract.getTokenOfOwnerByIndex(owner, index);
                        const nurse = new Nurse(this, nurseId.toNumber(), owner).appendTo(this);
                        nurse.toss("toggle", this);
                    }
                }, index * 50);
            });
        }
    }
}
