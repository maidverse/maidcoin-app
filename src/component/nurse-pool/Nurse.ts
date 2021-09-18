import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import SkyUtil from "skyutil";
import superagent from "superagent";
import Calculator from "../../Calculator";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import NetworkProvider from "../../ethereum/NetworkProvider";
import StaticDataManager from "../../StaticDataManager";
import NurseDetail from "./NurseDetail";

export default class Nurse extends DomNode {

    private lifetime: undefined | DomNode;
    private currentBlockNumber: undefined | number;
    private endBlock: undefined | number;

    constructor(private nurseId: number) {
        super(".nurse");
        this.load();
        this.onDom("click", () => new NurseDetail(nurseId));
    }

    private async load() {

        this.currentBlockNumber = await NetworkProvider.getBlockNumber();
        const nurse = await CloneNursesContract.getNurse(this.nurseId);
        this.endBlock = nurse.endBlock;

        const nurseType = StaticDataManager.getNurseType(nurse.nurseType);

        const result = await superagent.get(`https://api.maidcoin.org/nursetypes/${nurse.nurseType}`);
        const tokenInfo = result.body;

        const image = el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${tokenInfo.name}Idle.png`, height: "70" }).appendTo(this);
        if (SkyUtil.random(0, 1) === 0) {
            image.style({ transform: "scaleX(-1)" })
        }

        const pendingReward = await CloneNursesContract.getPendigReward(this.nurseId);

        const lifetimePercent = (this.endBlock - this.currentBlockNumber) /
            Calculator.nurseLifetime(
                nurse.nurseType,
                nurseType.partCount,
                true,
            ) * 100;

        this.append(
            el("a.claim-button",
                el("img.coin-image", { src: "/images/component/nurse-pool/maidcoin.png", height: "29" }),
                el(".amount", CommonUtil.numberWithCommas(utils.formatEther(pendingReward))),
                {
                    click: async (event: MouseEvent) => {
                        event.stopPropagation();
                        await CloneNursesContract.claim([this.nurseId]);
                    },
                },
            ),
            el(`.battery${lifetimePercent <= 0 ? ".low" : ""}`,
                lifetimePercent <= 0 ? el("img", { src: "/images/component/nurse-pool/low-battery.png", height: "14.5" }) : el(".bar", {
                    style: { width: `${lifetimePercent < 0 ? 0 : lifetimePercent}%` },
                }),
            ),
        );
    }
}
