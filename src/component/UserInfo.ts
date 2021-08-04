import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import CommonUtil from "../CommonUtil";
import MaidCoinContract from "../contracts/MaidCoinContract";
import Wallet from "../ethereum/Wallet";

export default class UserInfo extends DomNode {

    private ownerPanel: DomNode;
    private maidCoinPanel: DomNode;
    private connectButton: DomNode;

    constructor() {
        super(".user-info");
        this.append(
            this.ownerPanel = el(".owner"),
            this.maidCoinPanel = el(".maid-coin"),
            this.connectButton = el("a.connect-button", "Connect", {
                click: () => Wallet.connect(),
            }),
        );

        this.ownerPanel.style({ display: "none" });
        this.maidCoinPanel.style({ display: "none" });
        this.connectButton.style({ display: "none" });

        this.loadUserInfo();
        this.loadMaidCoin();

        Wallet.on("connect", this.connectHandler);
        MaidCoinContract.on("Transfer", this.transferHandler);
    }

    private connectHandler = () => {
        this.loadUserInfo();
        this.loadMaidCoin();
    };

    private transferHandler = async (from: string, to: string, amount: BigNumber) => {
        const address = await Wallet.loadAddress();
        if (from === address || to === address) {
            this.loadMaidCoin();
        }
    };

    private async loadUserInfo() {
        const owner = await Wallet.loadAddress();
        if (owner === undefined) {

            this.ownerPanel.style({ display: "none" });
            this.maidCoinPanel.style({ display: "none" });
            this.connectButton.style({ display: "flex" });

        } else {

            this.ownerPanel.style({ display: "block" });
            this.maidCoinPanel.style({ display: "block" });
            this.connectButton.style({ display: "none" });

            this.ownerPanel.empty().append(
                el(".address", `Owner: ${CommonUtil.shortenAddress(owner)}`),
            );
        }
    }

    private async loadMaidCoin() {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const balance = await MaidCoinContract.balanceOf(owner);
            this.maidCoinPanel.empty().append(
                el("img.icon", { src: "/images/maidcoin.png", height: "21" }),
                el(".balance", utils.formatEther(balance)),
            );
        }
    }

    public delete(): void {

        Wallet.off("connect", this.connectHandler);
        MaidCoinContract.off("Transfer", this.transferHandler);

        super.delete();
    }
}
