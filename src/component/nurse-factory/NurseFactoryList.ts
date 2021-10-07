import { DomNode, el } from "@hanul/skynode";
import StaticDataManager from "../../StaticDataManager";
import Loading from "../Loading";
import NurseFactory from "./NurseFactory";

export default class NurseFactoryList extends DomNode {

    private loading: DomNode;
    private factoryContainer: DomNode;

    constructor() {
        super(".nurse-factory-list");
        this.append(
            this.loading = new Loading(),
            this.factoryContainer = el(".factory-container"),
        );
        this.loadFactories();
    }

    private async loadFactories() {

        const nurseTypes = StaticDataManager.getNurseTypes();
        for (const nurseType of nurseTypes) {
            new NurseFactory(nurseType).appendTo(this.factoryContainer);
        }

        this.loading.delete();
    }
}
