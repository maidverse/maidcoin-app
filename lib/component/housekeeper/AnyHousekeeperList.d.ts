import { DomNode } from "@hanul/skynode";
import AnyHousekeeper from "./AnyHousekeeper";
export default class AnyHousekeeperList extends DomNode {
    private selectable;
    private content;
    private loading;
    selectedHousekeeper: AnyHousekeeper | undefined;
    private zoomButton;
    constructor(selectable?: boolean);
    private connectHandler;
    private loadHousekeepers;
    private loadLingerieGirls;
    private loadSushiGirls;
    deselectHousekeeper(): void;
    delete(): void;
}
//# sourceMappingURL=AnyHousekeeperList.d.ts.map