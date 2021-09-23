import { DomNode, el, Popup } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../../CommonUtil";
import LPTokenContract from "../../../contracts/LPTokenContract";
import NurseRaidContract from "../../../contracts/NurseRaidContract";
import SushiGirlsContract from "../../../contracts/SushiGirlsContract";
import Wallet from "../../../ethereum/Wallet";
import StaticDataManager from "../../../StaticDataManager";
import TokenPrompt from "../../dialogue/TokenPrompt";

export default class SushiGirlDetail extends Popup {

    public content: DomNode;
    private additionalPower: undefined | DomNode;
    private supportedLP: undefined | DomNode;

    constructor(private id: number) {
        super(".sushigirl-detail");
        this.append(
            el("a.back-button", el("img", { src: "/images/component/housekeeper-detail/back-button.png", height: "19.5" }), {
                click: () => this.delete(),
            }),
            this.content = el(".content"),
        );
        this.load();
        SushiGirlsContract.on("Support", this.supportHandler);
        SushiGirlsContract.on("Desupport", this.desupportHandler);
    }

    private supportHandler = async (id: BigNumber) => {
        if (id.eq(this.id) === true) {
            const sushiGirl = StaticDataManager.getLingerieGirl(this.id);
            const supportedLP = await SushiGirlsContract.getSupportedLP(this.id);
            const sushiGirlPower = await NurseRaidContract.powerOfMaids(SushiGirlsContract.address, this.id);
            this.additionalPower?.empty().appendText(String(sushiGirlPower - sushiGirl.originPower));
            this.supportedLP?.empty().appendText(utils.formatEther(supportedLP));
        }
    };

    private desupportHandler = async (id: BigNumber) => {
        if (id.eq(this.id) === true) {
            const sushiGirl = StaticDataManager.getLingerieGirl(this.id);
            const supportedLP = await SushiGirlsContract.getSupportedLP(this.id);
            const sushiGirlPower = await NurseRaidContract.powerOfMaids(SushiGirlsContract.address, this.id);
            this.additionalPower?.empty().appendText(String(sushiGirlPower - sushiGirl.originPower));
            this.supportedLP?.empty().appendText(utils.formatEther(supportedLP));
        }
    };

    private async load() {

        const sushiGirl = StaticDataManager.getLingerieGirl(this.id);
        const supportedLP = await SushiGirlsContract.getSupportedLP(this.id);
        const sushiGirlOwner = await SushiGirlsContract.ownerOf(this.id);
        const sushiGirlPower = await NurseRaidContract.powerOfMaids(SushiGirlsContract.address, this.id);

        const result = await superagent.get(`https://api.maidcoin.org/sushigirls/${this.id}`);
        const tokenInfo = result.body;

        this.content.empty().append(
            el("img.image", { src: `https://storage.googleapis.com/maidcoin/SushiGirl/Character/${this.id}.png` }),
            el(".name", tokenInfo.name),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(sushiGirlOwner)}`),
            el(".properties",
                el(".power", el("img", { src: "/images/component/power-icon.png", height: "23" }), el("span", String(sushiGirlPower))),
                el(".property.origin-power", "Origin Power: ", el("span", String(sushiGirl.originPower))),
                el(".property.additional-power", "Additional Power: ", this.additionalPower = el("span", String(sushiGirlPower - sushiGirl.originPower))),
                el(".property.lp-amount", "LP Supported: ", this.supportedLP = el("span", utils.formatEther(supportedLP))),
            ),
            el(".controller",
                el("a.power-up-button", "Power Up", {
                    click: async (event: MouseEvent) => {
                        event.stopPropagation();
                        const owner = await Wallet.loadAddress();
                        if (owner !== undefined) {
                            const lpBalance = await LPTokenContract.balanceOf(owner);
                            new TokenPrompt(
                                "Support Sushi Girl",
                                "How much amount to support?",
                                "Support",
                                0, lpBalance,
                                async (amount) => {
                                    await SushiGirlsContract.support(this.id, amount);
                                },
                            );
                        }
                    },
                }),
                el("a.power-down-button", "Power Down", {
                    click: async (event: MouseEvent) => {
                        event.stopPropagation();
                        const supported = await SushiGirlsContract.getSupportedLP(this.id);
                        new TokenPrompt(
                            "Desupport Sushi Girl",
                            "How much amount to desupport?",
                            "Desupport",
                            0, supported,
                            async (amount) => {
                                await SushiGirlsContract.desupport(this.id, amount);
                            },
                        );
                    },
                }),
            ),
        );
    }

    public delete() {
        SushiGirlsContract.off("Support", this.supportHandler);
        SushiGirlsContract.off("Desupport", this.desupportHandler);
        super.delete();
    }
}
