import Dialogue from "./Dialogue";

export default class Confirm extends Dialogue {

    constructor(title: string, confirmTitle: string, confirm: () => void) {
        super(".confirm", title, confirmTitle, confirm);
    }
}
