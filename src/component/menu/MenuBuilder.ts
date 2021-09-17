import { DomNode, el } from "@hanul/skynode";
import { SkyRouter } from "skyrouter";

interface Menu {
    uri: string;
    name: string;
}

class MenuBuilder {

    public build(menus: Menu[]) {
        const els: DomNode[] = [];
        for (const menuItem of menus) {
            els.push(el(`a${location.pathname === `/${menuItem.uri}` ? ".on" : ""}`,
                menuItem.name,
                { click: () => SkyRouter.go(`/${menuItem.uri}`) },
            ));
        }
        return els;
    }
}

export default new MenuBuilder();
