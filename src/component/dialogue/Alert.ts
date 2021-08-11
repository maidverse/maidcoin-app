import { el } from "@hanul/skynode";
import Dialogue from "./Dialogue";

export default class Alert extends Dialogue {

    constructor(
        title: string,
        message: string,
        confirmTitle: string,
        confirm?: () => void,
    ) {
        super(".alert", title, confirmTitle, () => {
            if (confirm !== undefined) {
                confirm();
            }
        });
        this.content.append(
            el("p", message),
        );
    }
}
