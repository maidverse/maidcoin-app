import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import { RaidInfo } from "../../contracts/NurseRaidContract";

export default class NurseRaid extends DomNode {

    private content: DomNode;

    constructor(private raid: RaidInfo, private currentBlockNumber: number) {
        super(".nurse-raid");
        this.append(
            el(".background"),
            this.content = el(".content"),
        );
        this.load();
    }

    private async load() {

        const result = await superagent.post(`https://api.maidcoin.org/nursetype/${this.raid.nursePart}`);
        const tokenInfo = result.body;

        this.content.empty().append(
            el(".name", tokenInfo.name),
            el(".image", { style: { backgroundImage: `url(${tokenInfo.image})` } }),
            el(".end-time", `End ${CommonUtil.displayBlockDuration(this.raid.endBlock - this.currentBlockNumber)}`),
            el(".character",
                el("img", { src: "/images/test/NoelIdle.png", height: "85" }),
            ),
            el(".duration",
                el("span.title", "Duration"),
                el("span", CommonUtil.displayBlockDuration(this.raid.duration)),
            ),
            el(".progress"),
        );
    }
}
