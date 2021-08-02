import { DomNode, el } from "@hanul/skynode";
import { SkyRouter } from "skyrouter";

export default class PCMenu extends DomNode {

    constructor() {
        super(".pc-menu");
        this.load();
        window.addEventListener("popstate", this.load);
    }

    private load = () => {
        this.empty().append(
            el(`a${location.pathname === "/" ? ".on" : ""}`, "Dashboard", { click: () => SkyRouter.go("/") }),
            el(`a${location.pathname === "/maid" ? ".on" : ""}`, "Maid", { click: () => SkyRouter.go("/maid") }),
            el(`a${location.pathname === "/nurseraid" ? ".on" : ""}`, "Nurse Raid", { click: () => SkyRouter.go("/nurseraid") }),
            el(`a${location.pathname === "/nursefactory" ? ".on" : ""}`, "Nurse Factory", { click: () => SkyRouter.go("/nursefactory") }),
            el(`a${location.pathname === "/earn" ? ".on" : ""}`, "Earn", { click: () => SkyRouter.go("/earn") }),
        );
    };

    public delete() {
        window.removeEventListener("popstate", this.load);
        super.delete();
    }
}