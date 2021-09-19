import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, Popup } from "@hanul/skynode";
export default class RouteNursePopup extends Popup {
    content: DomNode;
    constructor(supportedLP: BigNumber, route: (toNurseId: number) => void);
}
//# sourceMappingURL=RouteNursePopup.d.ts.map