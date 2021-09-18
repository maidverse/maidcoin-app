import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import NurseRaidContract from "../../contracts/NurseRaidContract";
import Wallet from "../../ethereum/Wallet";
import MaidsContractSelector from "../../MaidsContractSelector";
import StaticDataManager from "../../StaticDataManager";
import AnyHousekeeperList from "../housekeeper/AnyHousekeeperList";
import MaidList from "./MaidList";

export default class SelectMaidPopup extends Popup {

    public content: DomNode;
    private footer: DomNode;

    private selectedSupporter: {
        type: string,
        id: number,
    } | undefined;

    constructor(private raidId: number) {
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

            const raid = StaticDataManager.getRaid(this.raidId);

            this.footer.empty().append(
                el("a.start-button",
                    utils.formatEther(raid.entranceFee),
                    el("img.icon", { src: "/images/maidcoin.png", height: "20.5" }),
                    "Start",
                    {
                        click: async () => {
                            let maidsAddress: undefined | string;
                            const maidsType = this.selectedSupporter?.type;
                            if (maidsType !== undefined) {
                                maidsAddress = MaidsContractSelector.typeToAddress(maidsType);
                            }
                            await NurseRaidContract.enter(this.raidId, maidsAddress, this.selectedSupporter?.id);
                            this.delete();
                        },
                    },
                ),
            );
        }
    }
}
