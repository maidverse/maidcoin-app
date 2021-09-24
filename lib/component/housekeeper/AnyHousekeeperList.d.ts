import { DomNode } from "@hanul/skynode";
import AnyHousekeeper from "./AnyHousekeeper";
export default class AnyHousekeeperList extends DomNode {
    private selectable;
    private content;
    selectedHousekeeper: AnyHousekeeper | undefined;
    private zoomButton;
    constructor(selectable?: boolean);
    private loadHousekeepers;
    private loadLingerieGirls;
    private loadSushiGirls;
    deselectHousekeeper(): void;
}
//# sourceMappingURL=AnyHousekeeperList.d.ts.map