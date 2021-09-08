import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import SkyUtil from "skyutil";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import NurseDetail from "./NurseDetail";

export default class Nurse extends DomNode {

    constructor(private nurseId: number) {
        super(".nurse");
        this.load();
        this.onDom("click", () => new NurseDetail(nurseId));
    }

    private async load() {
        const { nurseType } = await CloneNursesContract.getNurse(this.nurseId);
        const result = await superagent.post(`https://api.maidcoin.org/nursetypes/${nurseType}`);
        const tokenInfo = result.body;

        const image = el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${tokenInfo.name}Idle.png`, height: "70" }).appendTo(this);
        if (SkyUtil.random(0, 1) === 0) {
            image.style({ transform: "scaleX(-1)" })
        }

        const pendingReward = await CloneNursesContract.getPendigReward(this.nurseId);

        this.append(
            el("a.claim-button",
                el("img.coin-image", { src: "/images/maidcoin-claim.png" }),
                el(".amount", CommonUtil.numberWithCommas(utils.formatEther(pendingReward))),
            ),
        );
    }
}
