import { DomNode, el, Popup } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import CommonUtil from "../../CommonUtil";
import LPTokenContract from "../../contracts/LPTokenContract";
import MaidsContract from "../../contracts/MaidsContract";
import NurseRaidContract from "../../contracts/NurseRaidContract";
import Wallet from "../../ethereum/Wallet";
import StaticDataManager from "../../StaticDataManager";
import TokenPrompt from "../dialogue/TokenPrompt";
import Sound from "./Sound";

export default class MaidDetail extends Popup {

    public content: DomNode;
    private additionalPower: undefined | DomNode;
    private supportedLP: undefined | DomNode;
    private image1: DomNode | undefined;
    private image2: DomNode | undefined;

    constructor(private maidId: number) {
        super(".maid-detail");
        this.append(
            el(".back-button-container",
                el("a.back-button", el("img", { src: "/images/component/maid-detail/back-button.png", height: "19.5" }), {
                    click: () => this.delete(),
                }),
            ),
            this.content = el(".content"),
        );
        this.load();
        this.onDom("scroll", this.scrollHandler);
        MaidsContract.on("Support", this.supportHandler);
        MaidsContract.on("Desupport", this.desupportHandler);
    }

    private scrollHandler = () => {
        const level = (this.domElement.scrollTop / (this.domElement.scrollHeight - this.rect.height)) / 2;
        this.image1?.style({ filter: `brightness(${1 - level})`, zIndex: level < 0.25 ? 1 : 0 });
        this.image2?.style({ filter: `brightness(${0.5 + level})`, zIndex: level < 0.25 ? 0 : 1 });
    };

    private getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    private supportHandler = async (id: BigNumber) => {
        if (id.eq(this.maidId) === true) {
            const maid = StaticDataManager.getMaid(this.maidId);
            const supportedLP = await MaidsContract.getSupportedLP(this.maidId);
            const maidPower = await NurseRaidContract.powerOfMaids(MaidsContract.address, this.maidId);
            this.additionalPower?.empty().appendText(String(maidPower - maid.originPower));
            this.supportedLP?.empty().appendText(CommonUtil.displayPrice(supportedLP));
        }
    };

    private desupportHandler = async (id: BigNumber) => {
        if (id.eq(this.maidId) === true) {
            const maid = StaticDataManager.getMaid(this.maidId);
            const supportedLP = await MaidsContract.getSupportedLP(this.maidId);
            const maidPower = await NurseRaidContract.powerOfMaids(MaidsContract.address, this.maidId);
            this.additionalPower?.empty().appendText(String(maidPower - maid.originPower));
            this.supportedLP?.empty().appendText(CommonUtil.displayPrice(supportedLP));
        }
    };

    private async load() {

        const maid = StaticDataManager.getMaid(this.maidId);
        const supportedLP = await MaidsContract.getSupportedLP(this.maidId);
        const maidOwner = await MaidsContract.ownerOf(this.maidId);
        const maidPower = await NurseRaidContract.powerOfMaids(MaidsContract.address, this.maidId);

        this.content.empty().append(
            this.image1 = el("img.image", { src: `https://storage.googleapis.com/maidcoin/Maid/Dialogue/${maid.name}Dialogue.png` }),
            this.image2 = el("img.image2", { src: `https://storage.googleapis.com/maidcoin/Maid/Ultimate/${maid.name}Ultimate.png` }),
            el("header",
                el(".name", maid.name),
                el(".cv", `CV. ${maid.character_voice}`),
            ),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(maidOwner)}`),
            el("a.speak-button",
                el("img", { src: "/images/component/maid-detail/speak-button.png", height: "28.5" }),
                {
                    click: (event: MouseEvent) => {
                        event.stopPropagation();
                        new Sound({
                            wav: `https://storage.googleapis.com/maidcoin/Maid/Voice/${maid.name}/${maid.name}LobbyTap${this.getRandomInt(1, 2)}.wav`,
                        }).play();
                    },
                },
            ),
            el(".properties",
                el(".power", el("img", { src: "/images/component/power-icon.png", height: "23" }), el("span", String(maidPower))),
                el(".property.origin-power", "Origin Power: ", el("span", String(maid.originPower))),
                el(".property.additional-power", "Additional Power: ", this.additionalPower = el("span", String(maidPower - maid.originPower))),
                el(".property.lp-amount", "LP Supported: ", this.supportedLP = el("span", CommonUtil.displayPrice(supportedLP))),
            ),
            el(".controller",
                el("a.power-up-button", "Power Up", {
                    click: async (event: MouseEvent) => {
                        event.stopPropagation();
                        const owner = await Wallet.loadAddress();
                        if (owner !== undefined) {
                            const lpBalance = await LPTokenContract.balanceOf(owner);
                            new TokenPrompt(
                                "Support Maid",
                                "How much amount to support?",
                                "Support",
                                0, lpBalance,
                                async (amount) => {
                                    await MaidsContract.support(this.maidId, amount);
                                },
                            );
                        }
                    },
                }),
                el("a.power-down-button", "Power Down", {
                    click: async (event: MouseEvent) => {
                        event.stopPropagation();
                        const supported = await MaidsContract.getSupportedLP(this.maidId);
                        new TokenPrompt(
                            "Desupport Maid",
                            "How much amount to desupport?",
                            "Desupport",
                            0, supported,
                            async (amount) => {
                                await MaidsContract.desupport(this.maidId, amount);
                            },
                        );
                    },
                }),
            ),
            el("a.tweet-button",
                "Share",
                { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`MaidCoin Maid - ${maid.name}\nhttps://app.maidcoin.org/maids/${this.maidId}`)}`, target: "_blank" },
            ),
        );

        this.scrollHandler();
    }

    public delete() {
        MaidsContract.off("Support", this.supportHandler);
        MaidsContract.off("Desupport", this.desupportHandler);
        super.delete();
    }
}
