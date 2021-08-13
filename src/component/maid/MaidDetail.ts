import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import MaidContract from "../../contracts/MaidContract";
import Sound from "./Sound";

export default class MaidDetail extends Popup {

    public content: DomNode;
    public image1: DomNode | undefined;
    public image2: DomNode | undefined;

    constructor(private maidId: number) {
        super(".maid-detail");
        this.append(
            el("a.back-button", el("img", { src: "/images/component/maid-detail/back-button.png", height: "19.5" }), {
                click: () => this.delete(),
            }),
            this.content = el(".content"),
        );
        this.load();
        this.onDom("scroll", this.scrollHandler);
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

    private async load() {

        const maid = await MaidContract.getMaid(this.maidId);
        const maidOwner = await MaidContract.ownerOf(this.maidId);
        const maidPower = await MaidContract.powerOf(this.maidId);

        const result = await superagent.post(`https://api.maidcoin.org/maid/${this.maidId}`);
        const tokenInfo = result.body;

        this.content.empty().append(
            this.image1 = el("img.image", { src: tokenInfo.image }),
            this.image2 = el("img.image2", { src: `https://storage.googleapis.com/maidcoin/Illust/Ultimate/${tokenInfo.name}Ultimate.png` }),
            el("header",
                el(".name", tokenInfo.name),
                el(".cv", `CV. ${tokenInfo.character_voice}`),
            ),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(maidOwner)}`),
            el("a.speak-button",
                el("img", { src: "/images/component/maid-detail/speak-button.png", height: "28.5" }),
                {
                    click: (event: MouseEvent) => {
                        event.stopPropagation();
                        new Sound({
                            wav: `https://storage.googleapis.com/maidcoin/Voice/${tokenInfo.name}/${tokenInfo.name}LobbyTap${this.getRandomInt(1, 2)}.wav`,
                        }).play();
                    },
                },
            ),
            el(".properties",
                el(".power", el("img", { src: "/images/component/power-icon.png", height: "23" }), el("span", String(maidPower))),
                el(".property.origin-power", "Origin Power: ", el("span", String(maid.originPower))),
                el(".property.additional-power", "Additional Power: ", el("span", String(maidPower - maid.originPower))),
                el(".property.lp-amount", "LP Supported: ", el("span", utils.formatEther(maid.supportedLPTokenAmount))),
            ),
            el(".controller",
                el("a.power-up-button", "Power Up", {
                    click: async (event: MouseEvent) => {
                        event.stopPropagation();
                        const amount = prompt("How much amount to support?", "10");
                        if (amount) {
                            await MaidContract.support(this.maidId, utils.parseEther(amount));
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

        this.scrollHandler();
    }
}
