import { BigNumber } from "@ethersproject/bignumber";
import { utils } from "ethers";
import lingeriegirls from "./json/lingeriegirls.json";
import maids from "./json/maids.json";
import nurseparts from "./json/nurseparts.json";
import nursetypes from "./json/nursetypes.json";
import raids from "./json/raids.json";
import sushigirls from "./json/sushigirls.json";

class StaticDataManager {

    public getMaid(id: number): {
        originPower: number,
        name: string,
        character_voice: string,
    } {
        const raw = (maids as any)[id];
        return {
            originPower: raw.attributes.find((a: any) => a.trait_type === "Power").value,
            name: raw.name,
            character_voice: raw.character_voice,
        };
    }

    public getLingerieGirl(id: number): {
        originPower: number,
        name: string,
    } {
        const raw = (lingeriegirls as any)[id];
        return {
            originPower: raw.attributes.find((a: any) => a.trait_type === "Power").value,
            name: raw.name,
        };
    }

    public getSushiGirl(id: number): {
        originPower: number,
        name: string,
    } {
        const raw = (sushigirls as any)[id];
        return {
            originPower: raw.attributes.find((a: any) => a.trait_type === "Power").value,
            name: raw.name,
        };
    }

    public getNursePart(part: number): {
        name: string,
    } {
        return (nurseparts as any)[part];
    }

    public getNurseTypes(): number[] {
        const entries = Object.entries(nursetypes as any);
        entries.sort((a: any, b: any) => a[1].power - b[1].power);
        const types: number[] = [];
        for (const [type] of entries) {
            types.push(parseInt(type, 10));
        }
        return types;
    }

    public getNurseType(type: number): {
        name: string,
        partCount: number,
        destroyReturn: BigNumber,
        power: number,
        lifetime: number,
        width: number,
        left: number,
        top: number,
        averagePrice: number,
    } {
        const raw = (nursetypes as any)[type];
        return {
            name: raw.name,
            partCount: raw.partCount,
            destroyReturn: utils.parseEther(String(raw.destroyReturn)),
            power: raw.power,
            lifetime: raw.lifetime,
            width: raw.width,
            left: raw.left,
            top: raw.top,
            averagePrice: raw.averagePrice,
        };
    }

    public get raidCount() {
        return Object.keys((raids as any)).length;
    }

    public getRaid(id: number): {
        entranceFee: BigNumber,
        nursePart: number,
        maxRewardCount: number,
        duration: number,
        endBlock: number,
    } {
        const raw = (raids as any)[id];
        return {
            entranceFee: utils.parseEther(String(raw.entranceFee)),
            nursePart: raw.nursePart,
            maxRewardCount: raw.maxRewardCount,
            duration: raw.duration,
            endBlock: raw.endBlock,
        };
    }
}

export default new StaticDataManager();
