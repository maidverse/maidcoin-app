import { DomNode, el } from "@hanul/skynode";
import { View, ViewParams } from "skyrouter";
import LingerieGirlDetail from "../component/housekeeper/lingeriegirl/LingerieGirlDetail";
import LingerieGirlList from "../component/housekeeper/lingeriegirl/LingerieGirlList";
import SushiGirlDetail from "../component/housekeeper/sushigirl/SushiGirlDetail";
import SushiGirlList from "../component/housekeeper/sushigirl/SushiGirlList";
import Layout from "./Layout";
import ViewUtil from "./ViewUtil";

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
        this.load(params.type, params.id);
    }

    private async load(type: string | undefined, id: string | undefined) {

        if (type === undefined) {
            type = "lingeriegirls";
        }

        this.categoryList.empty().append(
            el(`a${type === "lingeriegirls" ? ".on" : ""}.category`, "Lingerie Girls", { click: () => ViewUtil.go("/housekeepers/lingeriegirls") }),
            el(`a${type === "sushigirls" ? ".on" : ""}.category`, "Sushi Girls", { click: () => ViewUtil.go("/housekeepers/sushigirls") }),
        );

        this.housekeeperList?.delete();

        if (type === "lingeriegirls") {
            this.container.append(
                this.housekeeperList = new LingerieGirlList(),
            );
            if (id !== undefined) {
                new LingerieGirlDetail(parseInt(id, 10));
            }
        }

        else if (type === "sushigirls") {
            this.container.append(
                this.housekeeperList = new SushiGirlList(),
            );
            if (id !== undefined) {
                new SushiGirlDetail(parseInt(id, 10));
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void {
        this.load(params.type, params.id);
    }

    public close(): void {
        this.container.delete();
    }
}
