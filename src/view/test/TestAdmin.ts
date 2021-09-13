import { DomNode, el } from "@hanul/skynode";
import { utils } from "ethers";
import { View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import CloneNursesContract from "../../contracts/CloneNursesContract";
import MaidsContract from "../../contracts/MaidsContract";
import NurseRaidContract from "../../contracts/NurseRaidContract";
import NetworkProvider from "../../ethereum/NetworkProvider";
import Layout from "../Layout";

export default class Admin implements View {

    private container: DomNode;
    private currentBlock: DomNode;

    constructor() {

        let partCountInput: DomNode<HTMLInputElement>;
        let destroyReturnInput: DomNode<HTMLInputElement>;
        let powerInput: DomNode<HTMLInputElement>;
        let lifetimeInput: DomNode<HTMLInputElement>;

        let entranceFeeInput: DomNode<HTMLInputElement>;
        let nursePartInput: DomNode<HTMLInputElement>;
        let maxRewardCountInput: DomNode<HTMLInputElement>;
        let durationInput: DomNode<HTMLInputElement>;
        let endBlockInput: DomNode<HTMLInputElement>;

        Layout.current.changeBackground("/images/view/maid/background.jpg");
        Layout.current.content.append(this.container = el(".admin-view",
            el("h2", "Admin Console"),
            this.currentBlock = el(".current-block", "Current Block: Loading..."),
            el(".admin-form.maid-form",
                el("h3", "Maids"),
                el(".action-button-container",
                    el("a.action-button.mint-maid-button", "Mint Maid", {
                        click: async () => {
                            const power = prompt("Please enter power", "50");
                            if (power) {
                                await MaidsContract.mint(power);
                            }
                        },
                    }),
                ),
            ),
            el(".admin-form.nurse-type-form",
                el("h3", "Nurse Type"),
                el("label", "Part Count",
                    partCountInput = el("input", { placeholder: "Part Count" }),
                ),
                el("label", "Destroy Return",
                    destroyReturnInput = el("input", { placeholder: "Destroy Return" }),
                ),
                el("label", "Power",
                    powerInput = el("input", { placeholder: "Power" }),
                ),
                el("label", "Lifetime",
                    lifetimeInput = el("input", { placeholder: "Power" }),
                ),
                el(".action-button-container",
                    el("a.action-button.create-nurse-type-button", "Create Nurse Type", {
                        click: async () => {
                            await CloneNursesContract.addNurseType(
                                [parseInt(partCountInput.domElement.value, 10)],
                                [utils.parseEther(destroyReturnInput.domElement.value)],
                                [parseInt(powerInput.domElement.value, 10)],
                                [parseInt(lifetimeInput.domElement.value, 10)],
                            );
                        },
                    }),
                ),
            ),
            el(".admin-form.nurse-raid-form",
                el("h3", "Nurse Raid"),
                el("label", "Entrance Fee",
                    entranceFeeInput = el("input", { placeholder: "Entrance Fee" }),
                ),
                el("label", "Nurse Part",
                    nursePartInput = el("input", { placeholder: "Nurse Part" }),
                ),
                el("label", "Max Reward Count",
                    maxRewardCountInput = el("input", { placeholder: "Max Reward Count" }),
                ),
                el("label", "Duration",
                    durationInput = el("input", { placeholder: "Duration" }),
                ),
                el("label", "End Block",
                    endBlockInput = el("input", { placeholder: "End Block" }),
                ),
                el(".action-button-container",
                    el("a.action-button.create-nurse-raid-button", "Create Nurse Raid", {
                        click: async () => {
                            await NurseRaidContract.create(
                                [utils.parseEther(entranceFeeInput.domElement.value)],
                                [parseInt(nursePartInput.domElement.value, 10)],
                                [parseInt(maxRewardCountInput.domElement.value, 10)],
                                [parseInt(durationInput.domElement.value, 10)],
                                [parseInt(endBlockInput.domElement.value, 10)],
                            );
                        },
                    }),
                ),
            ),
        ));
        this.load();
    }

    private async load() {
        const blockNumber = await NetworkProvider.getBlockNumber();
        this.currentBlock.empty().appendText(`Current Block: ${blockNumber}`);
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
