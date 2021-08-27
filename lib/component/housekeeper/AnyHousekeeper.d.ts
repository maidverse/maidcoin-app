import { DomNode } from "@hanul/skynode";
export default class AnyHousekeeper extends DomNode {
    type: string;
    id: number;
    private selectable;
    constructor(type: string, id: number, selectable: boolean);
    private load;
    deselect(): void;
}
//# sourceMappingURL=AnyHousekeeper.d.ts.map