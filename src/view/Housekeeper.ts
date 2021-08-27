import { DomNode, el } from "@hanul/skynode";
import { SkyRouter, View, ViewParams } from "skyrouter";
import SushiGirlList from "../component/housekeeper/sushigirl/SushiGirlList";
import Layout from "./Layout";

export default class Housekeeper implements View {

    private container: DomNode;
    private categoryList: DomNode;
    private housekeeperList: DomNode | undefined;

    constructor(params: ViewParams) {
        Layout.current.changeBackground("/images/view/housekeeper/background.jpg");
        Layout.current.content.append(this.container = el(".housekeeper-view",
            el(".category-area",
                this.categoryList = el(".category-list"),
            ),
        ));
        this.load(params.type);
    }

    private async load(type: string | undefined) {

        if (type === undefined) {
            type = "lingeriegirls";
        }

        this.categoryList.empty().append(
            el(`a${type === "lingeriegirls" ? ".on" : ""}.category`, "Lingerie Girls", { click: () => SkyRouter.go("/housekeeper/lingeriegirls") }),
            el(`a${type === "sushigirls" ? ".on" : ""}.category`, "Sushi Girls", { click: () => SkyRouter.go("/housekeeper/sushigirls") }),
        );

        this.housekeeperList?.delete();
        if (type === "sushigirls") {
            this.container.append(
                this.housekeeperList = new SushiGirlList(),
            );
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.load(params.type);
    }

    public close(): void {
        this.container.delete();
    }
}
