import { DomNode } from "@hanul/skynode";
import SkyUtil from "skyutil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import Wallet from "../../ethereum/Wallet";
import NursePool from "./NursePool";

export default class NursePoolList extends DomNode {

    constructor() {
        super(".nurse-pool-list");
        this.loadNursePools();
    }

    private async loadNursePools() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            // nurseType => nurse ids
            const nurses: { [nurseType: number]: number[] } = {};

            const nurseCount = (await CloneNursesContract.balanceOf(owner)).toNumber();

            const promises: Promise<any>[] = [];
            SkyUtil.repeat(nurseCount, (index) => {
                promises.push((async () => {
                    const nurseId = (await CloneNursesContract.getTokenOfOwnerByIndex(owner, index)).toNumber();
                    const nurseInfo = await CloneNursesContract.getNurse(nurseId);
                    if (nurses[nurseInfo.nurseType] === undefined) {
                        nurses[nurseInfo.nurseType] = [];
                    }
                    nurses[nurseInfo.nurseType].push(nurseId);
                })());
            });
            await Promise.all(promises);

            for (const [nurseType, nurseIds] of Object.entries(nurses)) {
                this.append(new NursePool(parseInt(nurseType, 10), nurseIds));
            }
        }
    }
}
