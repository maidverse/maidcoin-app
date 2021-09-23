import { DomNode, el } from "@hanul/skynode";
import { BigNumber, utils } from "ethers";
import CommonUtil from "../../CommonUtil";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import StaticDataManager from "../../StaticDataManager";

export default class Nurse extends DomNode {

    private supportedPower: undefined | DomNode;

    constructor(public nurseId: number, private owner: string) {
        super(".nurse");
        this.load();
        CloneNursesContract.on("ChangeSupportedPower", this.changeSupportedPowerHandler);
    }

    private changeSupportedPowerHandler = async (id: BigNumber) => {
        if (id.eq(this.nurseId) === true) {
            const supportedPower = await CloneNursesContract.getSupportedPower(this.nurseId);
            this.supportedPower?.empty().appendText(utils.formatEther(supportedPower));
        }
    };

    private async load() {

        const nurse = await CloneNursesContract.getNurse(this.nurseId);
        const supportedPower = await CloneNursesContract.getSupportedPower(this.nurseId);

        const nurseType = StaticDataManager.getNurseType(nurse.nurseType);

        this.empty().append(
            el(".slot",
                el("img.image", { src: `https://storage.googleapis.com/maidcoin/Nurse/Face/${nurseType.name}.png` }),
                el(".name", nurseType.name),
            ),
            el(".owner", `Owner: ${CommonUtil.shortenAddress(this.owner)}`),
            el(".lp-amount", "Supported LP : ", this.supportedPower = el("span", utils.formatEther(supportedPower))),
            el("a.route-button", "Route", {
                click: async (event: MouseEvent) => {
                    event.stopPropagation();
                    this.fireEvent("route", this.nurseId);
                },
            }),
        );
    }

    public delete() {
        CloneNursesContract.off("ChangeSupportedPower", this.changeSupportedPowerHandler);
        super.delete();
    }
}
