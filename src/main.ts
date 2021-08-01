import { SkyRouter } from "skyrouter";
import Layout from "./view/Layout";
import Maid from "./view/Maid";
import NurseRaid from "./view/NurseRaid";

SkyRouter.route("**", Layout);
SkyRouter.route("maid", Maid);
SkyRouter.route("nurseraid", NurseRaid);

if (sessionStorage.__spa_path) {
    SkyRouter.go(sessionStorage.__spa_path);
    sessionStorage.removeItem("__spa_path");
}