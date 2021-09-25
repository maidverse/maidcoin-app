import { el } from "@hanul/skynode";
import Dialogue from "./Dialogue";

export default class Confirm extends Dialogue {

    constructor(title: string, message: string, confirmTitle: string, confirm: () => void) {
        super(".confirm", title, confirmTitle, confirm);
        this.content.append(
            el("p", message),
        );
    }
}
