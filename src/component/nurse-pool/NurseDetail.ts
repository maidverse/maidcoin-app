import { DomNode, el, Popup } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import superagent from "superagent";
import Calculator from "../../Calculator";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import TheMasterContract from "../../contracts/TheMasterContract";
import NetworkProvider from "../../ethereum/NetworkProvider";
import Wallet from "../../ethereum/Wallet";
import ChargeNursePopup from "./ChargeNursePopup";

export default class NurseDetail extends Popup {

    public content: DomNode;
    private lifetime: undefined | DomNode;

    private currentBlockNumber: undefined | number;
    private endBlock: undefined | number;

    constructor(private nurseId: number) {
        super(".nurse-detail");
        this.append(
            el("a.back-button", el("img", { src: "/images/component/nurse-detail/back-button.png", height: "19.5" }), {
                click: () => this.delete(),
            }),
            this.content = el(".content"),
        );
        this.load();
    }

    private async refreshLifetime() {
        if (this.endBlock !== undefined && this.currentBlockNumber !== undefined) {
            this.lifetime?.empty().appendText(
                CommonUtil.displayBlockDuration(this.endBlock - this.currentBlockNumber),
            );
        }
    }

    private async load() {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            this.currentBlockNumber = await NetworkProvider.getBlockNumber();

            const nurse = await CloneNursesContract.getNurse(this.nurseId);
            this.endBlock = nurse.endBlock;

            const nurseOwner = await CloneNursesContract.ownerOf(this.nurseId);
            const nurseType = await CloneNursesContract.getNurseType(nurse.nurseType);
            const supportedPower = await CloneNursesContract.getSupportedPower(this.nurseId);

            const supportingTo = (await CloneNursesContract.getSupportingTo(owner)).toNumber();
            const supportingAmount = supportingTo !== this.nurseId ? BigNumber.from(0) : await TheMasterContract.getSupportingAmount(owner);

            const result = await superagent.get(`https://api.maidcoin.org/nursetypes/${nurse.nurseType}`);
            const tokenInfo = result.body;

            const pendingReward = await CloneNursesContract.getPendigReward(this.nurseId);

            const lifetimePercent = (this.endBlock - this.currentBlockNumber) /
                Calculator.nurseLifetime(
                    nurseType.lifetime,
                    nurseType.partCount,
                    nurseType.partCount,
                    true,
                ) * 100;

            this.content.empty().append(
                el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Illust/${tokenInfo.name}.png` }),
                el(".name", tokenInfo.name),
                el(".owner", `Owner: ${CommonUtil.shortenAddress(nurseOwner)}`),
                el(".character",
                    el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/APNG/${tokenInfo.name}Idle.png`, height: "120" }),
                    el("a.claim-button",
                        el("img.coin-image", { src: "/images/component/nurse-detail/maidcoin.png", height: "29" }),
                        el(".amount", CommonUtil.numberWithCommas(utils.formatEther(pendingReward))),
                        { click: async () => await CloneNursesContract.claim([this.nurseId]) },
                    ),
                ),
                el(".battery",
                    el("span", "Battery"),
                    el(".range-container",
                        el(".range", el(".bar", {
                            style: { width: `${lifetimePercent}%` },
                        })),
                        this.lifetime = el(".lifetime"),
                    ),
                    el("a.charge-button",
                        el("img.image", { src: "/images/component/nurse-detail/charge-button.png", height: "29" }),
                        { click: () => new ChargeNursePopup(this.nurseId) },
                    ),
                ),
                el(".properties",
                    el(".power", el("img", { src: "/images/component/power-icon.png", height: "23" }), el("span", String(nurseType.power))),
                    el(".property.lp-amount", "Total LP Supported: ", el("span", utils.formatEther(supportedPower))),
                    el(".property.lp-amount", "LP Supported By Me: ", el("span", utils.formatEther(supportingAmount))),
                ),
                el(".controller",
                    el("a.power-up-button", "Power Up", {
                        click: async (event: MouseEvent) => {
                            event.stopPropagation();
                            const amount = prompt("How much amount to support?", "10");
                            if (amount) {
                                await TheMasterContract.support(3, utils.parseEther(amount), this.nurseId);
                            }
                        },
                    }),
                    el("a.power-down-button", "Power Down", {
                        click: async (event: MouseEvent) => {
                            event.stopPropagation();
                        },
                    }),
                ),
            );
        }

        this.refreshLifetime();
    }
}
