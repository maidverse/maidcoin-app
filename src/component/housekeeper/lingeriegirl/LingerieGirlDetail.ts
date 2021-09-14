import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../../CommonUtil";
import LingerieGirlsContract from "../../../contracts/LingerieGirlsContract";

export default class LingerieGirlDetail extends Popup {

    public content: DomNode;

    constructor(private id: number) {
        super(".lingeriegirl-detail");
        this.append(
            el("a.back-button", el("img", { src: "/images/component/housekeeper-detail/back-button.png", height: "19.5" }), {
                click: () => this.delete(),
            }),
            this.content = el(".content"),
        );
        this.load();
    }

    private async load() {

        const lingerieGirl = await LingerieGirlsContract.getLingerieGirl(this.id);
        const lingerieGirlOwner = await LingerieGirlsContract.ownerOf(this.id);
        const lingerieGirlPower = await LingerieGirlsContract.powerOf(this.id);

        const result = await superagent.get(`https://api.maidcoin.org/lingeriegirls/${this.id}`);
        const tokenInfo = result.body;

        this.content.empty().append(
            el("img.image", { src: `https://storage.googleapis.com/maidcoin/LingerieGirl/Character/${this.id}.png` }),
            el(".name", tokenInfo.name),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(lingerieGirlOwner)}`),
            el(".properties",
                el(".power", el("img", { src: "/images/component/power-icon.png", height: "23" }), el("span", String(lingerieGirlPower))),
                el(".property.origin-power", "Origin Power: ", el("span", String(lingerieGirl.originPower))),
                el(".property.additional-power", "Additional Power: ", el("span", String(lingerieGirlPower - lingerieGirl.originPower))),
                el(".property.lp-amount", "LP Supported: ", el("span", utils.formatEther(lingerieGirl.supportedLPTokenAmount))),
            ),
            el(".controller",
                el("a.power-up-button", "Power Up", {
                    click: async (event: MouseEvent) => {
                        event.stopPropagation();
                        const amount = prompt("How much amount to support?", "10");
                        if (amount) {
                            await LingerieGirlsContract.support(this.id, utils.parseEther(amount));
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
}
