import { SkyRouter } from "skyrouter";
import Dashboard from "./view/Dashboard";
import Farm from "./view/Farm";
import Housekeeper from "./view/Housekeeper";
import Layout from "./view/Layout";
import Maid from "./view/Maid";
import MaidCafe from "./view/MaidCafe";
import Nursefactory from "./view/NurseFactory";
import NurseRaid from "./view/NurseRaid";
import TestAdmin from "./view/test/TestAdmin";
import TestLPToken from "./view/TestLPToken";

SkyRouter.route("**", Layout);
SkyRouter.route("", Dashboard);
SkyRouter.route("maid", Maid);
SkyRouter.route(["housekeeper", "housekeeper/{type}"], Housekeeper);
SkyRouter.route("nurseraid", NurseRaid);
SkyRouter.route("nursefactory", Nursefactory);
SkyRouter.route("farm", Farm);
SkyRouter.route("cafe", MaidCafe);
SkyRouter.route("test-lp-token", TestLPToken);

// test
SkyRouter.route("test/admin", TestAdmin);

if (sessionStorage.__spa_path) {
    SkyRouter.go(sessionStorage.__spa_path);
    sessionStorage.removeItem("__spa_path");
}