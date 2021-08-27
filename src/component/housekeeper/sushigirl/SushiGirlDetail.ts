import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../../CommonUtil";
import SushiGirlsContract from "../../../contracts/SushiGirlsContract";

export default class SushiGirlDetail extends Popup {

    public content: DomNode;

    constructor(private sushiGirlId: number) {
        super(".sushigirl-detail");
        this.append(
            el("a.back-button", el("img", { src: "/images/component/housekeeper-detail/back-button.png", height: "19.5" }), {
                click: () => this.delete(),
            }),
            this.content = el(".content"),
        );
        this.load();
    }

    private async load() {

        const sushiGirl = await SushiGirlsContract.getSushiGirl(this.sushiGirlId);
        const sushiGirlOwner = await SushiGirlsContract.ownerOf(this.sushiGirlId);
        const sushiGirlPower = await SushiGirlsContract.powerOf(this.sushiGirlId);

        const result = await superagent.post(`https://api.maidcoin.org/sushigirls/${this.sushiGirlId}`);
        const tokenInfo = result.body;

        this.content.empty().append(
            el("img.image", { src: tokenInfo.character_image }),
            el(".name", tokenInfo.name),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(sushiGirlOwner)}`),
            el(".properties",
                el(".power", el("img", { src: "/images/component/power-icon.png", height: "23" }), el("span", String(sushiGirlPower))),
                el(".property.origin-power", "Origin Power: ", el("span", String(sushiGirl.originPower))),
                el(".property.additional-power", "Additional Power: ", el("span", String(sushiGirlPower - sushiGirl.originPower))),
                el(".property.lp-amount", "LP Supported: ", el("span", utils.formatEther(sushiGirl.supportedLPTokenAmount))),
            ),
            el(".controller",
                el("a.power-up-button", "Power Up", {
                    click: async (event: MouseEvent) => {
                        event.stopPropagation();
                        const amount = prompt("How much amount to support?", "10");
                        if (amount) {
                            await SushiGirlsContract.support(this.sushiGirlId, utils.parseEther(amount));
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
