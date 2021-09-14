import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import NursePartContract from "../../contracts/NursePartContract";
import TheMasterContract from "../../contracts/TheMasterContract";
import Wallet from "../../ethereum/Wallet";
import SelectNursePopup from "../select-nurse-popup/SelectNursePopup";

export default class NurseFarm extends DomNode {

    private content: DomNode;
    private footer: DomNode;

    constructor() {
        super(".nurse-farm");
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

            const supportingAmount = await TheMasterContract.getSupportingAmount(owner);
            if (supportingAmount.eq(0) === true) {
                this.addClass("empty");

                this.content.empty().append(
                    el(".name", "Clone Nurse"),
                    el("a.add-button", el("img", { src: "/images/component/nurse-farm/add-button.png", height: "132.5" }), {
                        click: () => new SelectNursePopup(),
                    }),
                );

                this.footer.empty().append(
                    el(".property.apr", "APR: ", el("span", "0%")), //TODO:
                );
            }

            else {
                this.deleteClass("empty");

                const supportingTo = (await CloneNursesContract.getSupportingTo(owner)).toNumber();

                const result = await superagent.get(`https://api.maidcoin.org/clonenurses/${supportingTo}`);
                const tokenInfo = result.body;

                console.log(tokenInfo);
                //TODO:
            }
        }
    }

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        super.delete();
    }
}
