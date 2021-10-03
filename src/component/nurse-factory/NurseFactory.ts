import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import Calculator from "../../Calculator";
import CommonUtil from "../../CommonUtil";
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
        NursePartContract.on("TransferSingle", this.transferSingleHandler);
    }

    private connectHandler = () => {
        this.load();
    };

    private transferSingleHandler = async (operator: string, from: string, to: string, id: BigNumber, amount: BigNumber) => {
        if (from === await Wallet.loadAddress() && id.eq(this.nurseType)) {
            this.load();
        }
    };

    private async load() {

        const owner = await Wallet.loadAddress();

        const nurseType = StaticDataManager.getNurseType(this.nurseType);
        const balance = owner === undefined ? undefined : await NursePartContract.balanceOf(owner, this.nurseType);

        this.content.empty().append(
            el(".name", nurseType.name),
            el(".power",
                el("img", { src: "/images/component/nurse-factory/power-icon.png", height: "13.5" }),
                el("span", String(nurseType.power)),
            ),
            el(".image", {
                style: {
                    backgroundImage: `url(https://storage.googleapis.com/maidcoin/Nurse/Illust/${nurseType.name}.png)`,
                    width: nurseType.width,
                    backgroundPosition: `${nurseType.left}px calc(50% + ${nurseType.top + 56}px)`,
                },
            }),
            el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType.name}.png`, height: "60" }),
            balance === undefined ? undefined : el(".part-count", el("span.balance", balance.toString()), ` / ${nurseType.partCount}`),
            el(".destroy-return", "Destroy Return: ", el("span", CommonUtil.displayPrice(nurseType.destroyReturn)), " $MAID"),
        );

        const apr = await Calculator.nurseAPR(this.nurseType);
        this.footer.empty().append(
            el(".apr", "APR: ", el("span", `${CommonUtil.numberWithCommas(apr.toString())}%`)),
            balance === undefined ? undefined : el("a.create-button", "Create", {
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

    public delete(): void {
        Wallet.off("connect", this.connectHandler);
        NursePartContract.off("TransferSingle", this.transferSingleHandler);
        super.delete();
    }
}
