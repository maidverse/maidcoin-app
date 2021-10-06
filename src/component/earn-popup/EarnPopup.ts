import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../../CommonUtil";

export default class EarnPopup extends Popup {

    public content: DomNode;

    constructor(amount: BigNumber, apr: BigNumber) {
        super(".popup-background");
        this.append(
            this.content = el(".earn-popup",
                el(".amount", `+ ${CommonUtil.displayPrice(amount)}`),
                //el(".apr", "APR: ", el("span", `${CommonUtil.numberWithCommas(apr.toString())}%`)),
                el("a.close-button", el("img", { src: "/images/component/first-earn-popup/close-button.png", height: "20" }), {
                    click: () => this.delete(),
                }),
                el("a.tweet-button",
                    "Share",
                    { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I EARNED ${CommonUtil.displayPrice(amount)} $MAID from @maid_coin ♥️\n\n#GameFi #PlayToEarn #DeFi #YieldFarming #NFT #IEarnMaidCoin`)}`, target: "_blank" },
                ),
            ),
        );
    }
}
