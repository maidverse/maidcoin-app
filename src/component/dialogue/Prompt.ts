import Dialogue from "./Dialogue";

export default class Prompt extends Dialogue {

    constructor(title: string, confirmTitle: string, confirm: () => void) {
        super(".prompt", title, confirmTitle, confirm);
    }
}
