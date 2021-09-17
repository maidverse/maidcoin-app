import { DomNode } from "@hanul/skynode";
import { SkyRouter } from "skyrouter";
import menu from "./menu.json";
import MenuBuilder from "./MenuBuilder";

export default class PCMenu extends DomNode {

    constructor() {
        super(".pc-menu");
        this.load();
        SkyRouter.on("go", this.load);
    }

    private load = () => {
        this.empty().append(
            ...MenuBuilder.build(menu.menu),
        );
    };

    public delete() {
        SkyRouter.off("go", this.load);
        super.delete();
    }
}
