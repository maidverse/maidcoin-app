"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skynode_1 = require("@hanul/skynode");
const StaticDataManager_1 = __importDefault(require("../../StaticDataManager"));
const Loading_1 = __importDefault(require("../Loading"));
const NurseFactory_1 = __importDefault(require("./NurseFactory"));
class NurseFactoryList extends skynode_1.DomNode {
    constructor() {
        super(".nurse-factory-list");
        this.append(this.loading = new Loading_1.default(), this.factoryContainer = skynode_1.el(".factory-container"));
        this.loadFactories();
    }
    async loadFactories() {
        const nurseTypes = StaticDataManager_1.default.getNurseTypes();
        for (const nurseType of nurseTypes) {
            new NurseFactory_1.default(nurseType).appendTo(this.factoryContainer);
        }
        this.loading.delete();
    }
}
exports.default = NurseFactoryList;
//# sourceMappingURL=NurseFactoryList.js.map