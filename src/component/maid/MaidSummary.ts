import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import MaidContract from "../../contracts/MaidContract";
import Sound from "./Sound";

export default class MaidSummary extends DomNode {

    private content: DomNode;
    private footer: DomNode;

    constructor(private maidId: number) {
        super(".maid-summary");
        this.append(
            el(".background"),
            this.content = el(".content"),
            this.footer = el("footer"),
        );
        this.load();
    }

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
            el(".background", { style: { backgroundImage: `url(https://storage.googleapis.com/maidcoin/Illust/Ultimate/${tokenInfo.name}Ultimate.png)` } }),
            el(".image", { style: { backgroundImage: `url(${tokenInfo.image})` } }),
            el("header",
                el(".name", tokenInfo.name),
                el(".cv", `CV. ${tokenInfo.cv}`),
            ),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(maidOwner)}`),
            el("a.speak-button",
                el("img", { src: "/images/component/maid-summary/speak-button.png", height: "28.5" }),
                {
                    click: () => {
                        new Sound({
                            wav: `https://storage.googleapis.com/maidcoin/Voice/${tokenInfo.name}/${tokenInfo.name}LobbyTap${this.getRandomInt(1, 2)}.wav`,
                        }).play();
                    },
                },
            ),
            el(".properties",
                el(".property.power", "Power: ", el("span", String(maidPower))),
                el(".property.origin-power", "Origin Power: ", el("span", String(maid.originPower))),
                el(".property.additional-power", "Additional Power: ", el("span", String(maidPower - maid.originPower))),
                el(".property.lp-amount", "Supported LP Token Amount: ", el("span", utils.formatEther(maid.supportedLPTokenAmount))),
            ),
        );

        this.footer.empty().append(
            el("a.support-button", "Power Up", {
                click: async (event: MouseEvent) => {
                    event.stopPropagation();
                    const amount = prompt("How much amount to support?", "10");
                    if (amount) {
                        await MaidContract.support(this.maidId, utils.parseEther(amount));
                    }
                },
            }),
        );
    }
}
