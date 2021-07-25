import { SkyRouter } from "skyrouter";
import Layout from "./view/Layout";
import Maid from "./view/Maid";

SkyRouter.route("**", Layout);
SkyRouter.route("maid", Maid);

if (sessionStorage.__spa_path) {
    SkyRouter.go(sessionStorage.__spa_path);
    sessionStorage.removeItem("__spa_path");
}