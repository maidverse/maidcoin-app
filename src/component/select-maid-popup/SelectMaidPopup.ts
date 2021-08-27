import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import NurseRaidContract, { RaidInfo } from "../../contracts/NurseRaidContract";
import Wallet from "../../ethereum/Wallet";
import AnyHousekeeperList from "../housekeeper/AnyHousekeeperList";
import MaidList from "./MaidList";

export default class SelectMaidPopup extends Popup {

    public content: DomNode;
    private footer: DomNode;

    private selectedSupporter: {
        type: string,
        id: number,
    } | undefined;

    constructor(private raidId: number, private raid: RaidInfo) {
        super(".popup-background");

        let maidList: MaidList;
        let housekeeperList: AnyHousekeeperList;

        this.append(
            this.content = el(".select-maid-popup",
                el("h1", "Select Supporter"),
                el("a.close-button", el("img", { src: "/images/component/select-maid-popup/close-button.png", height: "25" }), {
                    click: () => this.delete(),
                }),
                el("main",
                    el("section",
                        el("h2", "Maid"),
                        maidList = new MaidList(),
                    ),
                    el("section",
                        el("h2", "Housekeeper"),
                        housekeeperList = new AnyHousekeeperList(true),
                    ),
                ),
                this.footer = el("footer"),
            ),
        );

        maidList.on("select", (id: number) => {
            this.selectedSupporter = { type: "Maid", id };
            housekeeperList.deselectHousekeeper();
        });

        housekeeperList.on("select", (type: string, id: number) => {
            this.selectedSupporter = { type, id };
            maidList.deselectMaid();
        });

        maidList.on("deselect", () => this.selectedSupporter = undefined);
        housekeeperList.on("deselect", () => this.selectedSupporter = undefined);

        this.load();
    }

    private async load() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            this.footer.empty().append(
                el("a.start-button",
                    utils.formatEther(this.raid.entranceFee),
                    el("img.icon", { src: "/images/maidcoin.png", height: "21" }),
                    "Start",
                    {
                        click: async () => {
                            //TODO: select housekeeper
                            await NurseRaidContract.enter(this.raidId);
                            this.delete();
                        },
                    },
                ),
            );
        }
    }
}
