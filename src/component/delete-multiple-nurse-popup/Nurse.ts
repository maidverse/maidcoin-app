import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import SkyUtil from "skyutil";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import NetworkProvider from "../../ethereum/NetworkProvider";
import StaticDataManager from "../../StaticDataManager";
import NurseList from "./NurseList";

export default class Nurse extends DomNode {

    private lifetime: undefined | DomNode;

    private currentBlockNumber: undefined | number;
    private endBlock: undefined | number;

    private supportedPower: BigNumber = BigNumber.from(0);
    private destroyReturn: BigNumber = BigNumber.from(0);

    constructor(nurseList: NurseList, public nurseId: number, private owner: string) {
        super(".nurse");
        const check = el<HTMLImageElement>("img.check", { src: "/images/component/delete-multiple-nurse-popup/unchecked.png", height: "21" }).appendTo(this);
        this.onDom("click", () => {
            if (nurseList.checkedNurseIds.includes(nurseId) !== true) {
                check.domElement.src = "/images/component/delete-multiple-nurse-popup/checked.png";
                nurseList.checkedNurseIds.push(nurseId);
                nurseList.totalSelectedSupportedPower = nurseList.totalSelectedSupportedPower.add(this.supportedPower);
                nurseList.totalDestroyReturn = nurseList.totalDestroyReturn.add(this.destroyReturn);
                this.addClass("selected");
            } else {
                check.domElement.src = "/images/component/delete-multiple-nurse-popup/unchecked.png";
                SkyUtil.pull(nurseList.checkedNurseIds, nurseId);
                nurseList.totalSelectedSupportedPower = nurseList.totalSelectedSupportedPower.sub(this.supportedPower);
                nurseList.totalDestroyReturn = nurseList.totalDestroyReturn.sub(this.destroyReturn);
                this.deleteClass("selected");
            }
            this.fireEvent("toggle");
        });
        this.load();

        CloneNursesContract.on("ElongateLifetime", this.elongateLifetimeHandler);
    }

    private async refreshLifetime() {
        if (this.endBlock !== undefined && this.currentBlockNumber !== undefined) {
            this.lifetime?.empty().appendText(
                CommonUtil.displayBlockDuration(this.endBlock - this.currentBlockNumber),
            );
        }
    }

    private elongateLifetimeHandler = (id: BigNumber, rechargedLifetime: BigNumber, lastEndBlock: BigNumber, newEndBlock: BigNumber) => {
        this.endBlock = newEndBlock.toNumber();
        this.refreshLifetime();
    };

    private async load() {

        this.currentBlockNumber = await NetworkProvider.getBlockNumber();
        const nurse = await CloneNursesContract.getNurse(this.nurseId);
        this.endBlock = nurse.endBlock;

        this.supportedPower = await CloneNursesContract.getSupportedPower(this.nurseId);

        const nurseType = StaticDataManager.getNurseType(nurse.nurseType);
        this.destroyReturn = nurseType.destroyReturn;

        this.append(
            el(".slot",
                el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${nurseType.name}.png` }),
                el(".name", nurseType.name),
            ),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(this.owner)}`),
            el(".lp-amount", "Supported LP : ", el("span", utils.formatEther(this.supportedPower))),
            this.lifetime = el(".lifetime"),
        );

        this.refreshLifetime();
    }

    public delete() {
        CloneNursesContract.off("ElongateLifetime", this.elongateLifetimeHandler);
        super.delete();
    }
}
