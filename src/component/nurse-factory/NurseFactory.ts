import { DomNode, el } from "@hanul/skynode";
import superagent from "superagent";
import CloneNurseContract from "../../contracts/CloneNurseContract";
import NursePartContract from "../../contracts/NursePartContract";
import Wallet from "../../ethereum/Wallet";

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

            const nurseType = await CloneNurseContract.getNurseType(this.nurseType);
            const balance = await NursePartContract.balanceOf(owner, this.nurseType);

            const result = await superagent.post(`https://api.maidcoin.org/nursetype/${this.nurseType}`);
            const tokenInfo = result.body;

            this.content.empty().append(
                el(".image", { style: { backgroundImage: `url(${tokenInfo.image})` } }),
                el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${this.nurseType}.png`, height: "60" }),
                el(".part-count", el("span.balance", balance.toString()), ` / ${nurseType.partCount}`),
            );

            this.footer.empty().append(
                el(".name", tokenInfo.name),
                el("a.create-button", "Create", {
                    click: async () => {
                        await CloneNurseContract.assemble(this.nurseType);
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
