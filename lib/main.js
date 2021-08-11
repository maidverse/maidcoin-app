"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyrouter_1 = require("skyrouter");
const Dashboard_1 = __importDefault(require("./view/Dashboard"));
const Farm_1 = __importDefault(require("./view/Farm"));
const Layout_1 = __importDefault(require("./view/Layout"));
const Maid_1 = __importDefault(require("./view/Maid"));
const NurseFactory_1 = __importDefault(require("./view/NurseFactory"));
const NurseRaid_1 = __importDefault(require("./view/NurseRaid"));
const TestAdmin_1 = __importDefault(require("./view/test/TestAdmin"));
skyrouter_1.SkyRouter.route("**", Layout_1.default);
skyrouter_1.SkyRouter.route("", Dashboard_1.default);
skyrouter_1.SkyRouter.route("maid", Maid_1.default);
skyrouter_1.SkyRouter.route("nurseraid", NurseRaid_1.default);
skyrouter_1.SkyRouter.route("nursefactory", NurseFactory_1.default);
skyrouter_1.SkyRouter.route("farm", Farm_1.default);
skyrouter_1.SkyRouter.route("test/admin", TestAdmin_1.default);
if (sessionStorage.__spa_path) {
    skyrouter_1.SkyRouter.go(sessionStorage.__spa_path);
    sessionStorage.removeItem("__spa_path");
}
//# sourceMappingURL=main.js.map