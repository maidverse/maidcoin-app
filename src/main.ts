import { SkyRouter } from "skyrouter";
import Alert from "./component/dialogue/Alert";
import Dashboard from "./view/Dashboard";
import Earn from "./view/Earn";
import Layout from "./view/Layout";
import Maid from "./view/Maid";
import Nursefactory from "./view/NurseFactory";
import NurseRaid from "./view/NurseRaid";
import TestAdmin from "./view/test/TestAdmin";

SkyRouter.route("**", Layout);
SkyRouter.route("", Dashboard);
SkyRouter.route("maid", Maid);
SkyRouter.route("nurseraid", NurseRaid);
SkyRouter.route("nursefactory", Nursefactory);
SkyRouter.route("earn", Earn);

// test
SkyRouter.route("test/admin", TestAdmin);

if (sessionStorage.__spa_path) {
    SkyRouter.go(sessionStorage.__spa_path);
    sessionStorage.removeItem("__spa_path");
}