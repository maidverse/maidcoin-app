import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import CommonUtil from "../../CommonUtil";
import NurseRaidContract from "../../contracts/NurseRaidContract";
import NetworkProvider from "../../ethereum/NetworkProvider";
import Wallet from "../../ethereum/Wallet";
import StaticDataManager from "../../StaticDataManager";
import Confirm from "../dialogue/Confirm";
import SelectMaidPopup from "../select-maid-popup/SelectMaidPopup";

export default class NurseRaid extends DomNode {

    private content: DomNode;
    private footer: DomNode;

    public done = false;

    constructor(public raidId: number, private currentBlockNumber: number) {
        super(".nurse-raid");
        this.append(
            el(".background"),
            this.content = el(".content"),
            this.footer = el("footer"),
        );
        this.load();

        NurseRaidContract.on("Enter", this.enterHandler);
        NurseRaidContract.on("Exit", this.exitHandler);
    }

    private enterHandler = async (challenger: string, id: BigNumber, maids: string, maidId: BigNumber) => {
        if (id.toNumber() === this.raidId && challenger === await Wallet.loadAddress()) {
            this.currentBlockNumber = await NetworkProvider.getBlockNumber();
            this.load();
        }
    };

    private exitHandler = async (challenger: string, id: BigNumber) => {
        if (id.toNumber() === this.raidId && challenger === await Wallet.loadAddress()) {
            this.currentBlockNumber = await NetworkProvider.getBlockNumber();
            this.load();
        }
    };

    private async load() {

        const raid = StaticDataManager.getRaid(this.raidId);
        const nuresType = StaticDataManager.getNurseType(raid.nursePart);

        this.content.empty().append(
            el(".name", nuresType.name),
            el(".image", { style: { backgroundImage: `url(https://storage.googleapis.com/maidcoin/Nurse/Illust/${nuresType.name}.png)` } }),
            el(".end-time", `End ${CommonUtil.displayBlockDuration(raid.endBlock - this.currentBlockNumber)}`),
            el(".character",
                el("img", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${nuresType.name}Idle.png`, height: "85" }),
            ),
            el(".duration",
                el("span.title", "Duration"),
                el("span", CommonUtil.displayBlockDuration(raid.duration)),
            ),
            el(".progress"),
        );

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const challenger = await NurseRaidContract.getChallenger(this.raidId, owner);

            this.done = challenger.enterBlock !== 0 && await NurseRaidContract.checkDone(this.raidId) === true;

            this.footer.empty().append(
                el(".reward",
                    el("h3", "Rewards"),
                    el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nuresType.name}.png`, height: "28" }),
                    el(".count", `x 1 ~ ${raid.maxRewardCount}`),
                ),
                challenger.enterBlock === 0 ? el("a.start-button",
                    utils.formatEther(raid.entranceFee),
                    el("img.icon", { src: "/images/maidcoin.png", height: "20.5" }),
                    "Start",
                    {
                        click: () => new SelectMaidPopup(this.raidId),
                    },
                ) : (this.done === true ? el("a.exit-button", "Exit", {
                    click: async () => {
                        await NurseRaidContract.exit([this.raidId]);
                    },
                }) : el("a.cancel-button", "Cancel", {
                    click: () => {
                        new Confirm("Cancel Raid", "Are you sure you want to cancel the raid? If you cancel, you will not receive any parts.", async () => {
                            await NurseRaidContract.exit([this.raidId]);
                        });
                    },
                })),
            );
        }
    }

    public delete() {
        NurseRaidContract.off("Enter", this.enterHandler);
        NurseRaidContract.off("Exit", this.exitHandler);
        super.delete();
    }
}
