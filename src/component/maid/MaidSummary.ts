import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import superagent from "superagent";
import CommonUtil from "../../CommonUtil";
import LPTokenContract from "../../contracts/LPTokenContract";
import MaidsContract from "../../contracts/MaidsContract";
import NurseRaidContract from "../../contracts/NurseRaidContract";
import Wallet from "../../ethereum/Wallet";
import StaticDataManager from "../../StaticDataManager";
import TokenPrompt from "../dialogue/TokenPrompt";
import MaidDetail from "./MaidDetail";
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
        this.content.onDom("click", () => new MaidDetail(maidId));
    }

    private getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max + 1 - min)) + min;
    }

    private async load() {

        const maid = StaticDataManager.getMaid(this.maidId);
        const supportedLP = await MaidsContract.getSupportedLP(this.maidId);
        const maidOwner = await MaidsContract.ownerOf(this.maidId);
        const maidPower = await NurseRaidContract.powerOfMaids(MaidsContract.address, this.maidId);

        const result = await superagent.get(`https://api.maidcoin.org/maids/${this.maidId}`);
        const tokenInfo = result.body;

        this.content.empty().append(
            el(".background", { style: { backgroundImage: `url(https://storage.googleapis.com/maidcoin/Maid/Ultimate/${tokenInfo.name}Ultimate.png)` } }),
            el(".image", { style: { backgroundImage: `url(https://storage.googleapis.com/maidcoin/Maid/Dialogue/${tokenInfo.name}Dialogue.png)` } }),
            el("header",
                el(".name", tokenInfo.name),
                el(".cv", `CV. ${tokenInfo.character_voice}`),
            ),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(maidOwner)}`),
            el("a.speak-button",
                el("img", { src: "/images/component/maid-summary/speak-button.png", height: "28.5" }),
                {
                    click: (event: MouseEvent) => {
                        event.stopPropagation();
                        new Sound({
                            wav: `https://storage.googleapis.com/maidcoin/Maid/Voice/${tokenInfo.name}/${tokenInfo.name}LobbyTap${this.getRandomInt(1, 2)}.wav`,
                        }).play();
                    },
                },
            ),
            el(".properties",
                el(".power", el("img", { src: "/images/component/power-icon.png", height: "23" }), el("span", String(maidPower))),
                el(".property.origin-power", "Origin Power: ", el("span", String(maid.originPower))),
                el(".property.additional-power", "Additional Power: ", el("span", String(maidPower - maid.originPower))),
                el(".property.lp-amount", "Supported LP Token Amount: ", el("span", utils.formatEther(supportedLP))),
            ),
        );

        this.footer.empty().append(
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
        );
    }
}
