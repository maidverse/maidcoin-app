"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skyrouter_1 = require("skyrouter");
const Dashboard_1 = __importDefault(require("./view/Dashboard"));
const Farm_1 = __importDefault(require("./view/Farm"));
const Housekeeper_1 = __importDefault(require("./view/Housekeeper"));
const Layout_1 = __importDefault(require("./view/Layout"));
const Maid_1 = __importDefault(require("./view/Maid"));
const MaidCafe_1 = __importDefault(require("./view/MaidCafe"));
const NurseFactory_1 = __importDefault(require("./view/NurseFactory"));
const NurseRaid_1 = __importDefault(require("./view/NurseRaid"));
skyrouter_1.SkyRouter.route("**", Layout_1.default);
skyrouter_1.SkyRouter.route(["", "clonenurses/{nurseId}"], Dashboard_1.default);
skyrouter_1.SkyRouter.route(["maids", "maids/{id}"], Maid_1.default);
skyrouter_1.SkyRouter.route(["housekeepers", "housekeepers/{type}", "housekeepers/{type}/{id}"], Housekeeper_1.default);
skyrouter_1.SkyRouter.route("nurseraids", NurseRaid_1.default);
skyrouter_1.SkyRouter.route("nursefactories", NurseFactory_1.default);
skyrouter_1.SkyRouter.route("farms", Farm_1.default);
skyrouter_1.SkyRouter.route("cafe", MaidCafe_1.default);
if (sessionStorage.__spa_path) {
    skyrouter_1.SkyRouter.go(sessionStorage.__spa_path);
    sessionStorage.removeItem("__spa_path");
}
//# sourceMappingURL=main.js.map