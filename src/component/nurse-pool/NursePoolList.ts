import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import Wallet from "../../ethereum/Wallet";
import ChargeMultipleNursePopup from "../charge-multiple-nurse-popup/ChargeMultipleNursePopup";
import DeleteMultipleNursePopup from "../delete-multiple-nurse-popup/DeleteMultipleNursePopup";
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
            const totalNurseIds: number[] = [];

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
                    totalNurseIds.push(nurseId);
                })());
            });
            await Promise.all(promises);

            if (this.deleted !== true) {

                for (const [nurseType, nurseIds] of Object.entries(nurses)) {
                    this.append(new NursePool(parseInt(nurseType, 10), nurseIds));
                }

                if (totalNurseIds.length > 0) {
                    this.append(
                        el("footer",
                            el("a.claim-all-button", "Claim All", {
                                click: async () => {
                                    await CloneNursesContract.claim(totalNurseIds);
                                },
                            }),
                            el("a.charge-all-button", "Charge All", {
                                click: () => new ChargeMultipleNursePopup(),
                            }),
                            el("a.destroy-all-button", "Destroy All", {
                                click: () => new DeleteMultipleNursePopup(),
                            }),
                        ),
                    );
                }
            }
        }
    }
}
