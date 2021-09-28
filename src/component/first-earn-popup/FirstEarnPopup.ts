import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../../CommonUtil";

export default class FirstEarnPopup extends Popup {

    public content: DomNode;

    constructor(amount: BigNumber) {
        super(".popup-background");
        this.append(
            this.content = el(".first-earn-popup",
                el("h1", "First Earn $MAID !"),
                el(".amount",
                    el("span", `+ ${CommonUtil.numberWithCommas(utils.formatEther(amount), 5)}`),
                    el("img.maidcoin", { src: "/images/component/first-earn-popup/maidcoin.png", height: "32" }),
                ),
                el("a.close-button", el("img", { src: "/images/component/first-earn-popup/close-button.png", height: "20" }), {
                    click: () => this.delete(),
                }),
                el("a.tweet-button",
                    "Share",
                    { href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I earned ${utils.formatEther(amount)} $MAID !\nhttps://app.maidcoin.org`)}`, target: "_blank" },
                ),
            ),
        );
    }
}
