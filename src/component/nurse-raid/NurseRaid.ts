import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import NurseRaidContract, { RaidInfo } from "../../contracts/NurseRaidContract";
import Wallet from "../../ethereum/Wallet";
import SelectMaidPopup from "../select-maid-popup/SelectMaidPopup";

export default class NurseRaid extends DomNode {

    private content: DomNode;
    private footer: DomNode;

    constructor(private raidId: number, private raid: RaidInfo, private currentBlockNumber: number) {
        super(".nurse-raid");
        this.append(
            el(".background"),
            this.content = el(".content"),
            this.footer = el("footer"),
        );
        this.load();
    }

    private async load() {

        const result = await superagent.post(`https://api.maidcoin.org/nursetypes/${this.raid.nursePart}`);
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

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const challenger = await NurseRaidContract.getChallenger(this.raidId, owner);

            this.footer.empty().append(
                el(".reward",
                    el("h3", "Rewards"),
                    el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${this.raid.nursePart}.png`, height: "28" }),
                    el(".count", `x 1 ~ ${this.raid.maxRewardCount}`),
                ),
                challenger.enterBlock === 0 ? el("a.start-button",
                    utils.formatEther(this.raid.entranceFee),
                    el("img.icon", { src: "/images/maidcoin.png", height: "21" }),
                    "Start",
                    {
                        click: () => new SelectMaidPopup(this.raidId, this.raid),
                    },
                ) : el("a.cancel-button", await NurseRaidContract.checkDone(this.raidId) === true ? "Exit" : "Cancel", {
                    click: async () => {
                        await NurseRaidContract.exit(this.raidId);
                    },
                }),
            );
        }
    }
}
