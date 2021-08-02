import { SkyRouter } from "skyrouter";
import TestAdmin from "./view/test/TestAdmin";
import Layout from "./view/Layout";
import Maid from "./view/Maid";
import NurseRaid from "./view/NurseRaid";

SkyRouter.route("**", Layout);
SkyRouter.route("maid", Maid);
SkyRouter.route("nurseraid", NurseRaid);

// test
SkyRouter.route("test/admin", TestAdmin);

if (sessionStorage.__spa_path) {
    SkyRouter.go(sessionStorage.__spa_path);
    sessionStorage.removeItem("__spa_path");
}