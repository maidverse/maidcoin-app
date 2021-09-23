import { DomNode, el } from "@hanul/skynode";
import { BigNumber, constants, utils } from "ethers";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import NursePartContract from "../../contracts/NursePartContract";
import NetworkProvider from "../../ethereum/NetworkProvider";
import StaticDataManager from "../../StaticDataManager";

export default class Nurse extends DomNode {

    private lifetime: undefined | DomNode;
    private supportedPower: undefined | DomNode;

    private currentBlockNumber: undefined | number;
    private endBlock: undefined | number;

    public partCount = 0;

    constructor(public nurseId: number, private owner: string) {
        super(".nurse");
        this.load();
        CloneNursesContract.on("ElongateLifetime", this.elongateLifetimeHandler);
        CloneNursesContract.on("ChangeSupportedPower", this.changeSupportedPowerHandler);
        CloneNursesContract.on("Transfer", this.transferHandler);
    }

    private async refreshLifetime() {
        if (this.endBlock !== undefined && this.currentBlockNumber !== undefined) {
            this.lifetime?.empty().appendText(
                CommonUtil.displayBlockDuration(this.endBlock - this.currentBlockNumber),
            );
        }
    }

    private elongateLifetimeHandler = (id: BigNumber, rechargedLifetime: BigNumber, lastEndBlock: BigNumber, newEndBlock: BigNumber) => {
        if (id.eq(this.nurseId) === true) {
            this.endBlock = newEndBlock.toNumber();
            this.refreshLifetime();
        }
    };

    private changeSupportedPowerHandler = async (id: BigNumber) => {
        if (id.eq(this.nurseId) === true) {
            const supportedPower = await CloneNursesContract.getSupportedPower(this.nurseId);
            this.supportedPower?.empty().appendText(utils.formatEther(supportedPower));
        }
    };

    private transferHandler = async (from: string, to: string, id: BigNumber) => {
        // burn
        if (to === constants.AddressZero && id.eq(this.nurseId) === true) {
            this.delete();
        }
    };

    private async load() {

        this.currentBlockNumber = await NetworkProvider.getBlockNumber();
        const nurse = await CloneNursesContract.getNurse(this.nurseId);
        this.endBlock = nurse.endBlock;

        const nuserOwner = await CloneNursesContract.ownerOf(this.nurseId);
        const supportedPower = await CloneNursesContract.getSupportedPower(this.nurseId);

        const nurseType = StaticDataManager.getNurseType(nurse.nurseType);
        const nursePart = (await NursePartContract.balanceOf(this.owner, nurse.nurseType)).toNumber();

        this.empty().append(
            el(".slot",
                el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${nurseType.name}.png` }),
                el(".name", nurseType.name),
            ),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(nuserOwner)}`),
            el(".lp-amount", "Supported LP : ", this.supportedPower = el("span", utils.formatEther(supportedPower))),
            this.lifetime = el(".lifetime"),
            el(".charge-form",
                el("img.part", { src: `https://storage.googleapis.com/maidcoin/NursePart/${nurseType.name}.png`, height: "50" }),
                el(".input-container",
                    el("img", { src: "/images/component/charge-multiple-nurse-popup/battery.png", height: "24" }),
                    el("input", {
                        change: (event, input) => {
                            const value = (input.domElement as HTMLInputElement).value;
                            this.partCount = parseInt(value, 10);
                            if (isNaN(this.partCount) === true) {
                                this.partCount = 0;
                            } else if (this.partCount > nursePart) {
                                this.partCount = nursePart;
                                (input.domElement as HTMLInputElement).value = String(nursePart);
                            }
                        },
                    }),
                    el("span", ` / ${nursePart}`),
                ),
            ),
        );

        this.refreshLifetime();
    }

    public delete() {
        CloneNursesContract.off("ElongateLifetime", this.elongateLifetimeHandler);
        CloneNursesContract.off("ChangeSupportedPower", this.changeSupportedPowerHandler);
        CloneNursesContract.off("Transfer", this.transferHandler);
        super.delete();
    }
}
