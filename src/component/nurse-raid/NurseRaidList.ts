import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import NurseRaidContract from "../../contracts/NurseRaidContract";
import Loading from "../Loading";
import NurseRaid from "./NurseRaid";

export default class NurseRaidList extends DomNode {

    private loading: Loading;
    private raidContainer: DomNode;

    constructor() {
        super(".nurse-raid-list");
        this.append(
            this.loading = new Loading(),
            this.raidContainer = el(".raid-container"),
            el(".test", { style: { backgroundImage: "url(/images/component/nurse-raid/background.png", height: 155, backgroundSize: "auto 100%" } },
                el("img", { src: "/images/test/NoelAttack.png", height: "87.5" }),
            ),
        );
        this.loadRaids();
    }

    private async loadRaids() {

        const raidCount = (await NurseRaidContract.getRaidCount()).toNumber();

        SkyUtil.repeat(raidCount, async (raidId) => {
            new NurseRaid(raidId).appendTo(this.raidContainer);
        });

        this.loading.delete();
    }
}
