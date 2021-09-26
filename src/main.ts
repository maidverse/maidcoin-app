import { SkyRouter } from "skyrouter";
import Dashboard from "./view/Dashboard";
import Farm from "./view/Farm";
import Housekeeper from "./view/Housekeeper";
import Layout from "./view/Layout";
import Maid from "./view/Maid";
import MaidCafe from "./view/MaidCafe";
import Nursefactory from "./view/NurseFactory";
import NurseRaid from "./view/NurseRaid";

SkyRouter.route("**", Layout);
SkyRouter.route(["", "clonenurses/{nurseId}"], Dashboard);
SkyRouter.route(["maids", "maids/{id}"], Maid);
SkyRouter.route(["housekeepers", "housekeepers/{type}", "housekeepers/{type}/{id}"], Housekeeper);
SkyRouter.route("nurseraids", NurseRaid);
SkyRouter.route("nursefactories", Nursefactory);
SkyRouter.route("farms", Farm);
SkyRouter.route("cafe", MaidCafe);

// test
//SkyRouter.route("test/test-lp-token", TestLPToken);
//SkyRouter.route("test/test-maidcoin", TestMaidCoin);
//SkyRouter.route("test/admin", TestAdmin);

if (sessionStorage.__spa_path) {
    SkyRouter.go(sessionStorage.__spa_path);
    sessionStorage.removeItem("__spa_path");
}
