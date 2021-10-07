import { DomNode, el, Popup } from "@hanul/skynode";
import { BigNumber } from "ethers";
import Calculator from "../Calculator";
import CommonUtil from "../CommonUtil";
import CloneNursesContract from "../contracts/CloneNursesContract";
import LPTokenContract from "../contracts/LPTokenContract";
import MaidCoinContract from "../contracts/MaidCoinContract";
import TheMasterContract from "../contracts/TheMasterContract";
import NetworkProvider from "../ethereum/NetworkProvider";
import Wallet from "../ethereum/Wallet";
import EarnFromFarmPopup from "./earn-from-farm-popup/EarnFromFarmPopup";
import EarnFromNursePopup from "./earn-from-nurse-popup/EarnFromNursePopup";

export default class UserInfo extends DomNode {

    private ownerPanel: DomNode;
    private maidCoinPanel: DomNode;
    private connectButton: DomNode;

    private popup: Popup | undefined;

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
        this.loadBalances();

        Wallet.on("connect", this.connectHandler);
        LPTokenContract.on("Transfer", this.transferHandler);
        MaidCoinContract.on("Transfer", this.transferHandler);
        TheMasterContract.on("Deposit", this.depositHandler);
        TheMasterContract.on("Support", this.supportHandler);
        CloneNursesContract.on("Claim", this.claimHandler);
    }

    private connectHandler = () => {
        this.loadUserInfo();
        this.loadBalances();
    };

    private transferHandler = async (from: string, to: string, amount: BigNumber) => {
        const address = await Wallet.loadAddress();
        if (from === address || to === address) {
            this.loadBalances();
        }
    };

    private depositHandler = async (userId: BigNumber, pid: BigNumber, amount: BigNumber, event: any) => {
        const address = await Wallet.loadAddress();
        if (userId.eq(BigNumber.from(address)) && pid.eq(1) && amount.eq(0)) {
            const result = await NetworkProvider.provider.getTransactionReceipt(event.transactionHash);
            for (const log of result.logs) {
                if (log.address === MaidCoinContract.address) {
                    const parsed = MaidCoinContract.interface.parseLog(log);
                    if (parsed.name === "Transfer" && parsed.args[0] === TheMasterContract.address && parsed.args[1] === address) {
                        const apr = await Calculator.poolAPR(pid.toNumber());
                        if (this.popup === undefined) {
                            this.popup = new EarnFromFarmPopup(event.transactionHash, parsed.args[2], apr);
                            this.popup.on("delete", () => this.popup = undefined);
                        }
                        break;
                    }
                }
            }
        }
    };

    private supportHandler = async (supporter: string, pid: BigNumber, amount: BigNumber, event: any) => {
        const address = await Wallet.loadAddress();
        if (supporter === address && pid.eq(3) && amount.eq(0)) {
            const result = await NetworkProvider.provider.getTransactionReceipt(event.transactionHash);
            for (const log of result.logs) {
                if (log.address === MaidCoinContract.address) {
                    const parsed = MaidCoinContract.interface.parseLog(log);
                    if (parsed.name === "Transfer" && parsed.args[0] === TheMasterContract.address && parsed.args[1] === address) {
                        const apr = await Calculator.poolAPR(pid.toNumber());
                        if (this.popup === undefined) {
                            this.popup = new EarnFromFarmPopup(event.transactionHash, parsed.args[2], apr);
                            this.popup.on("delete", () => this.popup = undefined);
                        }
                        break;
                    }
                }
            }
        }
    };

    private claimHandler = async (nurseId: BigNumber, claimer: string, reward: BigNumber, event: any) => {
        const address = await Wallet.loadAddress();
        if (claimer === address) {
            const nurse = await CloneNursesContract.getNurse(nurseId);
            const apr = await Calculator.nurseAPR(nurse.nurseType);
            if (this.popup === undefined) {
                this.popup = new EarnFromNursePopup(event.transactionHash, reward, apr);
                this.popup.on("delete", () => this.popup = undefined);
            }
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

    private async loadBalances() {
        const owner = await Wallet.loadAddress();
        if (owner !== undefined) {
            const lpBalance = await LPTokenContract.balanceOf(owner);
            const maidBalance = await MaidCoinContract.balanceOf(owner);
            this.maidCoinPanel.empty().append(
                el(".balance",
                    el("img.icon", { src: "/images/lptoken.png", height: "20.5" }),
                    el(".amount", CommonUtil.displayPrice(lpBalance)),
                    el("a.add-button",
                        el("img", { src: "/images/component/user-info/add-button.png", height: "19" }),
                        { href: "https://app.sushi.com/add/ETH/0x4Af698B479D0098229DC715655c667Ceb6cd8433", target: "_blank" },
                    ),
                ),
                el(".balance",
                    el("img.icon", { src: "/images/maidcoin.png", height: "20.5" }),
                    el(".amount", CommonUtil.displayPrice(maidBalance)),
                    el("a.add-button",
                        el("img", { src: "/images/component/user-info/add-button.png", height: "19" }),
                        { href: "https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0x4Af698B479D0098229DC715655c667Ceb6cd8433", target: "_blank" },
                    ),
                ),
            );
        }
    }

    public delete(): void {

        Wallet.off("connect", this.connectHandler);
        LPTokenContract.off("Transfer", this.transferHandler);
        MaidCoinContract.off("Transfer", this.transferHandler);
        TheMasterContract.off("Deposit", this.depositHandler);
        TheMasterContract.off("Support", this.supportHandler);
        CloneNursesContract.off("Claim", this.claimHandler);

        super.delete();
    }
}
