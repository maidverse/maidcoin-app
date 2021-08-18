import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import CloneNurseContract from "../../contracts/CloneNurseContract";
import NursePartContract from "../../contracts/NursePartContract";
import Wallet from "../../ethereum/Wallet";
import NursePart from "./NursePart";

export default class NursePartList extends DomNode {

    private content: DomNode;

    constructor() {
        super(".nurse-part-list");
        this.append(
            el(".background"),
            this.content = el(".content"),
        );
        this.loadNurseParts();
    }

    private async loadNurseParts() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const nurseTypeCount = (await CloneNurseContract.getNurseTypeCount()).toNumber();
            SkyUtil.repeat(nurseTypeCount, async (nurseType) => {
                const nursePartCount = (await NursePartContract.balanceOf(owner, nurseType)).toNumber();
                
                this.content.append(new NursePart(nurseType, nursePartCount));
            });
        }
    }
}
