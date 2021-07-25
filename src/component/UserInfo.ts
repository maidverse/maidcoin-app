import { DomNode, el } from "@hanul/skynode";

export default class UserInfo extends DomNode {

    constructor() {
        super(".user-info");
        this.append(
            el("a.connect-button", "Connect", {
                //click: () => Wallet.connect(),
            }),
        );
    }
}
