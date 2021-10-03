import { BigNumberish } from "@ethersproject/bignumber";
import { utils } from "ethers";
import Config from "./Config";

class CommonUtil {

    public shortenAddress(address: string) {
        return `${address.substring(0, 6)}...${address.substring(38)}`
    }

    public displayBlockDuration(blockCount: number) {
        if (blockCount < 0) {
            return "0s";
        }

        let seconds = blockCount * Config.blockTimeSecond;

        const day = Math.floor(seconds / 86400);
        seconds -= day * 86400;

        const hour = Math.floor(seconds / 3600);
        seconds -= hour * 3600;

        const minute = Math.floor(seconds / 60);
        seconds -= minute * 60;

        if (day !== 0) {
            return `${day}d ${hour}h ${minute}m ${seconds}s`;
        } else if (hour !== 0) {
            return `${hour}h ${minute}m ${seconds}s`;
        } else if (minute !== 0) {
            return `${minute}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    }

    public numberWithCommas(x: string, fractionDigits = 3) {
        const parts = String(+(+x).toFixed(fractionDigits)).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }

    public displayPrice(amount: BigNumberish) {
        return this.numberWithCommas(utils.formatEther(amount), 5);
    }
}

export default new CommonUtil();
