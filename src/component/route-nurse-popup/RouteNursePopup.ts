import { BigNumber } from "@ethersproject/bignumber";
import { DomNode, el, Popup } from "@hanul/skynode";
import { utils } from "ethers";
import CommonUtil from "../../CommonUtil";
import NurseList from "./NurseList";

export default class RouteNursePopup extends Popup {

    public content: DomNode;

    constructor(supportedLP: BigNumber, route: (toNurseId: number) => void) {
        super(".popup-background");

        let addressInput: DomNode<HTMLInputElement>;
        let nurseList: NurseList;

        this.append(
            this.content = el(".route-nurse-popup",
                el("h1", "Delete Nurse"),
                el("a.close-button", el("img", { src: "/images/component/route-nurse-popup/close-button.png", height: "22.5" }), {
                    click: () => this.delete(),
                }),
                el(".supported-lp",
                    "Supported LP: ",
                    el("span", CommonUtil.numberWithCommas(utils.formatEther(supportedLP))),
                ),
                el("main",
                    el("h2", "Route Nurse"),
                    el(".search",
                        addressInput = el("input", { placeholder: "0x12345..." }),
                        el("a.search-button", el("img", { src: "/images/component/select-nurse-popup/search-button.png", height: "32.5" }), {
                            click: () => {
                                const address = addressInput.domElement.value.trim();
                                if (address === "") {
                                    nurseList.loadAllNurses();
                                } else {
                                    nurseList.find(address);
                                }
                            },
                        }),
                    ),
                    nurseList = new NurseList(),
                ),
                el("footer",
                    el("a.confirm-button",
                        "Close",
                        { click: () => this.delete() },
                    ),
                ),
            ),
        );

        nurseList.on("route", (nurseId: number) => {
            route(nurseId);
            this.delete();
        });
    }
}
