import { DomNode } from "@hanul/skynode";
import AnyHousekeeper from "./AnyHousekeeper";
export default class AnyHousekeeperList extends DomNode {
    private selectable;
    private content;
    selectedHousekeeper: AnyHousekeeper | undefined;
    constructor(selectable?: boolean);
    private loadHousekeepers;
    private loadSushiGirls;
    deselectHousekeeper(): void;
}
//# sourceMappingURL=AnyHousekeeperList.d.ts.map