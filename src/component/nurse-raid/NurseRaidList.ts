import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import NurseRaidContract from "../../contracts/NurseRaidContract";
import NetworkProvider from "../../ethereum/NetworkProvider";
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
        );
        this.loadRaids();
    }

    private async loadRaids() {

        const raidCount = (await NurseRaidContract.getRaidCount()).toNumber();
        const currentBlockNumber = await NetworkProvider.getBlockNumber();

        SkyUtil.repeat(raidCount, async (raidId) => {
            const raid = await NurseRaidContract.getRaid(raidId);
            if (currentBlockNumber < raid.endBlock) {
                new NurseRaid(raid, currentBlockNumber).appendTo(this.raidContainer);
            }
        });

        this.loading.delete();
    }
}
