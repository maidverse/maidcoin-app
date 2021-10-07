import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import Calculator from "../../Calculator";
import CommonUtil from "../../CommonUtil";

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
                { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I EARNED +${CommonUtil.displayPrice(this.amount)} $MAID ($${CommonUtil.numberWithCommas(dollar.toString())}) from @maid_coin ♥️\nCurrent APR is ${CommonUtil.numberWithCommas(String(this.apr))}%!!!\n\n${this.tx}\n#GameFi #PlayToEarn #DeFi #YieldFarming #NFT #IEarnMaid`)}`, target: "_blank" },
            ),
        );
    }
}
