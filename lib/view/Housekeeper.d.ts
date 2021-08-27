import { View, ViewParams } from "skyrouter";
export default class Housekeeper implements View {
    private container;
    private categoryList;
    private housekeeperList;
    constructor(params: ViewParams);
    private load;
    changeParams(params: ViewParams, uri: string): void;
    close(): void;
}
//# sourceMappingURL=Housekeeper.d.ts.map