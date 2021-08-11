import { DomNode, el } from "@hanul/skynode";
import Dialogue from "./Dialogue";

export default class SlidePrompt extends Dialogue {

    private input: DomNode<HTMLInputElement>;
    private range: DomNode<HTMLInputElement>;

    constructor(
        title: string,
        message: string,
        confirmTitle: string,
        confirm: (value: number) => void,
    ) {
        super(".slide-prompt", title, confirmTitle, () => {

        });
        this.content.append(
            el("p", message),
            this.input = el("input.input"),
            this.range = el("input.range", { type: "range" }),
        );
    }
}
