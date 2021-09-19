import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";
import NursePartContract from "../../contracts/NursePartContract";
import Wallet from "../../ethereum/Wallet";
import StaticDataManager from "../../StaticDataManager";
import Alert from "../dialogue/Alert";
import CreateNursePopup from "./CreateNursePopup";

export default class NurseFactory extends DomNode {

    private content: DomNode;
    private footer: DomNode;

    constructor(private nurseType: number) {
        super(".nurse-factory");
        this.append(
            el(".background"),
            this.content = el(".content"),
            this.footer = el("footer"),
        );
        this.load();
        Wallet.on("connect", this.connectHandler);
    }

    private connectHandler = () => {
        this.load();
    };

    private async load() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const nurseType = StaticDataManager.getNurseType(this.nurseType);
            const balance = await NursePartContract.balanceOf(owner, this.nurseType);

            this.content.empty().append(
                el(".image", { style: { backgroundImage: `url(https://storage.googleapis.com/maidcoin/Nurse/Illust/${nurseType.name}.png)` } }),
                el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType.name}.png`, height: "60" }),
                el(".part-count", el("span.balance", balance.toString()), ` / ${nurseType.partCount}`),
            );

            const result = await superagent.get(`https://api.maidcoin.org/nursetypes/${this.nurseType}`);
            const tokenInfo = result.body;

            this.footer.empty().append(
                el(".name", tokenInfo.name),
                el("a.create-button", "Create", {
                    click: () => {
                        if (balance.toNumber() < nurseType.partCount) {
                            new Alert("Error", "Nurse Parts not enough.", "Confirm");
                        } else {
                            new CreateNursePopup(this.nurseType);
                        }
                    },
                }),
            );
        }
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        super.delete();
    }
}
