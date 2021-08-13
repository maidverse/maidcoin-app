import { SkyRouter } from "skyrouter";
import Dashboard from "./view/Dashboard";
import Farm from "./view/Farm";
import Housekeeper from "./view/Housekeeper";
import Layout from "./view/Layout";
import Maid from "./view/Maid";
import Nursefactory from "./view/NurseFactory";
import NurseRaid from "./view/NurseRaid";
import TestAdmin from "./view/test/TestAdmin";

SkyRouter.route("**", Layout);
SkyRouter.route("", Dashboard);
SkyRouter.route("maid", Maid);
SkyRouter.route("housekeeper", Housekeeper);
SkyRouter.route("nurseraid", NurseRaid);
SkyRouter.route("nursefactory", Nursefactory);
SkyRouter.route("farm", Farm);

// test
SkyRouter.route("test/admin", TestAdmin);

if (sessionStorage.__spa_path) {
    SkyRouter.go(sessionStorage.__spa_path);
    sessionStorage.removeItem("__spa_path");
}