import { BodyNode, DomNode, el } from "@hanul/skynode";
import { BigNumber, constants } from "ethers";
import { View } from "skyrouter";
import { ViewParams } from "skyrouter/lib/View";
import MobileMenu from "../component/menu/MobileMenu";
import MoreMenu from "../component/menu/MoreMenu";
import PCMenu from "../component/menu/PCMenu";
import GetNurseNoti from "../component/noti/GetNurseNoti";
import GetPartsNoti from "../component/noti/GetPartsNoti";
import UserInfo from "../component/UserInfo";
import CloneNursesContract from "../contracts/CloneNursesContract";
import NursePartContract from "../contracts/NursePartContract";
import Wallet from "../ethereum/Wallet";
import ViewUtil from "./ViewUtil";

export default class Layout implements View {

    public static current: Layout;

    private container: DomNode;
    public content: DomNode;

    constructor() {
        Layout.current = this;
        BodyNode.append(this.container = el(".layout",
            el("header",
                el("a.menu-button", el("img", { src: "/images/view/layout/menu-button.png", height: "16" }), {
                    click: (event, button) => {
                        const rect = button.rect;
                        new MobileMenu({ left: rect.left - 4, top: rect.top - 4 }).appendTo(BodyNode);
                    },
                }),
                el("h1", el("a",
                    el("img.pc-logo", { src: "/images/view/layout/pc-logo.png", height: "24" }),
                    el("img.mobile-logo", { src: "/images/view/layout/mobile-logo.png", height: "28" }),
                    { click: () => ViewUtil.go("/") },
                )),
                new PCMenu(),
                el(".span"),
                new UserInfo(),
                el("a.more-button", el("img", { src: "/images/view/layout/more-button.png", height: "24" }), {
                    click: (event, button) => {
                        const rect = button.rect;
                        new MoreMenu({ left: rect.right - 200, top: rect.top + 36 }).appendTo(BodyNode);
                    },
                }),
            ),
            el("main",
                this.content = el(".content"),
            ),
        ));

        CloneNursesContract.on("Transfer", this.transferNurseHandler);
        NursePartContract.on("TransferSingle", this.transferPartHandler);
    }

    public changeBackground(src: string, top: string = "bottom") {
        this.container.style({ backgroundImage: `url(${src})`, backgroundPositionY: top });
    }

    private transferNurseHandler = async (from: string, to: string, id: BigNumber) => {
        if (from === constants.AddressZero && to === await Wallet.loadAddress()) {
            const nurse = await CloneNursesContract.getNurse(id);
            new GetNurseNoti(nurse.nurseType);
        }
    };

    private transferPartHandler = async (operator: string, from: string, to: string, id: BigNumber, amount: BigNumber) => {
        if (from === constants.AddressZero && to === await Wallet.loadAddress()) {
            new GetPartsNoti(id.toNumber(), amount.toNumber());
        }
    };

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        CloneNursesContract.off("Transfer", this.transferNurseHandler);
        NursePartContract.off("TransferSingle", this.transferPartHandler);
        this.container.delete();
    }
}
