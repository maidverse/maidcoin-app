import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";
import CloneNursesContract from "../../contracts/CloneNursesContract";

export default class Nurse extends DomNode {

    constructor(public nurseId: number) {
        super(".nurse");
        this.load();
    }

    private async load() {
        const { nurseType } = await CloneNursesContract.getNurse(this.nurseId);
        const result = await superagent.get(`https://api.maidcoin.org/nursetypes/${nurseType}`);
        const tokenInfo = result.body;

        this.empty().append(
            el("img.image", { src: `https://storage.googleapis.com/maidcoin/CloneNurse/Face/${nurseType}.png` }),
            el(".name", tokenInfo.name),
        );
    }
}
