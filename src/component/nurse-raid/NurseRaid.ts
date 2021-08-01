import { DomNode } from "@hanul/skynode";

export default class NurseRaid extends DomNode {

    constructor(private raidId: number) {
        super(".nurse-raid");
    }
}
