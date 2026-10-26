import {IStorage} from "./IStorage";
import {World} from "../game/objects/World";
import {StaticDataService} from "../infrastructure/services/StaticDataService";

export class RuntimeStorage implements IStorage {
    private readonly _ping: number;

    private _worldSnapshot?: string;

    constructor(staticData: StaticDataService) {
        this._ping = staticData.config.SERVER.storagePingMs;
    }

    async syncWorldState(world: World): Promise<boolean> {
        await this.ping();
        this._worldSnapshot = JSON.stringify(world);
        console.log(`Saved world state:`, this._worldSnapshot);
        return Promise.resolve(true);
    }

    private ping(): Promise<void> {
        return new Promise((e) => setTimeout(e, this._ping));
    }
}