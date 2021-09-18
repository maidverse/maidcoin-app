import { DomNode, el, Popup } from "@hanul/skynode";
import superagent from "superagent";
import Calculator from "../../Calculator";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import NursePartContract from "../../contracts/NursePartContract";
import Wallet from "../../ethereum/Wallet";

export default class ChargeNursePopup extends Popup {

    public content: DomNode;

    private nurseType: undefined | number;
    private input: undefined | DomNode<HTMLInputElement>;
    private range: undefined | DomNode<HTMLInputElement>;
    private lifetime: undefined | DomNode;

    constructor(private nurseId: number) {
        super(".popup-background");

        this.append(
            this.content = el(".charge-nurse-popup",
                el("a.close-button", el("img", { src: "/images/component/nurse-battery-popup/close-button.png", height: "25" }), {
                    click: () => this.delete(),
                }),
                el("h1", "Charge Nurse"),
                el("p", "Enter the number of nurse parts."),
            ),
        );

        this.load();
    }

    private refreshLifetime() {
        if (this.nurseType !== undefined && this.input !== undefined) {
            this.lifetime?.empty().appendText(
                CommonUtil.displayBlockDuration(
                    Calculator.nurseLifetime(
                        this.nurseType,
                        parseInt(this.input.domElement.value, 10),
                        false,
                    ),
                ),
            );
        }
    }

    private async load() {

        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {

            const nurse = await CloneNursesContract.getNurse(this.nurseId);
            this.nurseType = nurse.nurseType;

            const balance = (await NursePartContract.balanceOf(owner, nurse.nurseType)).toNumber();

            const result = await superagent.get(`https://api.maidcoin.org/nursetypes/${nurse.nurseType}`);
            const tokenInfo = result.body;

            this.content.append(
                el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${tokenInfo.name}.png`, height: "80" }),
                el(".part-count",
                    this.input = el("input", {
                        value: String(0),
                        change: () => {
                            if (this.range !== undefined && this.input !== undefined) {
                                const currentValue = parseInt(this.input.domElement.value, 10);
                                if (currentValue < 0) {
                                    this.input.domElement.value = String(0);
                                } else if (currentValue > balance) {
                                    this.input.domElement.value = String(balance);
                                }
                                this.range.domElement.value = this.input.domElement.value;
                            }
                            this.refreshLifetime();
                        },
                    }),
                    ` / ${balance.toString()}`,
                ),
                this.range = el("input.range", {
                    type: "range",
                    value: String(0),
                    min: "0",
                    max: balance.toString(),
                    change: () => {
                        if (this.input !== undefined && this.range !== undefined) {
                            this.input.domElement.value = this.range.domElement.value;
                        }
                        this.refreshLifetime();
                    },
                }),
                el(".lifetime-container",
                    el("img.icon", { src: "/images/component/nurse-battery-popup/battery.png", height: "22" }),
                    this.lifetime = el(".lifetime"),
                ),
                el("a.charge-button", "Charge", {
                    click: async () => {
                        if (this.input !== undefined) {
                            await CloneNursesContract.elongateLifetime([this.nurseId], [parseInt(this.input.domElement.value, 10)]);
                        }
                        this.delete();
                    },
                }),
            );
            this.refreshLifetime();
        }
    }
}
