import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import superagent from "superagent";
import Calculator from "../../Calculator";
import CommonUtil from "../../CommonUtil";
import Loading from "../Loading";

export default class EarnFromFarmPopup extends Popup {

    public content: DomNode;

    constructor(
        private tx: string,
        private amount: BigNumber,
        private apr: BigNumber,
    ) {
        super(".popup-background");
        this.append(this.content = el(".earn-from-farm-popup"));
        this.load();
    }

    private async load() {
        const dollar = await Calculator.dollar(this.amount);
        this.content.append(
            el(".amount", `+ ${CommonUtil.displayPrice(this.amount)}`),
            el(".apr", "APR: ", el("span", `${CommonUtil.numberWithCommas(this.apr.toString())}%`)),
            el(".dollar", `+ ${CommonUtil.numberWithCommas(dollar.toString())}`),
            el("a.close-button", el("img", { src: "/images/component/earn-from-farm-popup/close-button.png", height: "20" }), {
                click: () => this.delete(),
            }),
            el("a.tweet-button",
                "Share",
                {
                    click: async () => {
                        const loading = new Loading().appendTo(this);
                        const result = await superagent.get(`https://api.maidcoin.org/generate-tweet-image?type=farm&tx=${this.tx}&amount=${CommonUtil.displayPrice(this.amount)}&dollar=${CommonUtil.numberWithCommas(dollar.toString())}&apr=${CommonUtil.numberWithCommas(this.apr.toString())}`);
                        const url = result.text;
                        open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I EARNED +${CommonUtil.displayPrice(this.amount)} $MAID ($${CommonUtil.numberWithCommas(dollar.toString())}) from @maid_coin ♥️\nCurrent APR is ${CommonUtil.numberWithCommas(String(this.apr))}%!!!\n\n#GameFi #PlayToEarn #DeFi #YieldFarming #NFT #IEarnMaid\n${url}`)}`);
                        loading.delete();
                    },
                },
            ),
        );
    }
}
