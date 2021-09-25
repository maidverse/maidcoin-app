import { DomNode, el } from "@hanul/skynode";
import SkyUtil from "skyutil";
import NetworkProvider from "../../ethereum/NetworkProvider";
import StaticDataManager from "../../StaticDataManager";
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

    public async getDoneRaids(owner: string): Promise<number[]> {
        const raidIds: number[] = [];
        const promises: Promise<any>[] = [];
        for (const child of this.raidContainer.children) {
            promises.push((async () => {
                if (child instanceof NurseRaid && await child.checkDone(owner) === true) {
                    raidIds.push(child.raidId);
                }
            })());
        }
        await Promise.all(promises);
        return raidIds;
    }

    private async loadRaids() {

        const currentBlockNumber = await NetworkProvider.getBlockNumber();

        let index = 0;
        SkyUtil.repeat(StaticDataManager.raidCount, async (raidId) => {
            if (this.deleted !== true) {
                const raid = StaticDataManager.getRaid(raidId);
                if (currentBlockNumber < raid.endBlock) {
                    setTimeout(() => {
                        new NurseRaid(raidId, currentBlockNumber).appendTo(this.raidContainer);
                    }, index * 50);
                    index += 1;
                }
            }
        });

        this.loading.delete();
    }
}
