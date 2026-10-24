import {World} from "../game/objects/World";
import {StaticDataService} from "./services/StaticDataService";

export class GameLoop {
    get world(): World {
        if (!this._world)
            throw new Error("Game world is not initialized yet!");
        return this._world;
    }

    private _world?: World;
    private _interval?: NodeJS.Timeout;

    private readonly _tickIntervalMs: number;

    constructor(staticData: StaticDataService) {
        this._tickIntervalMs = staticData.config.tickIntervalMs;
    }

    start(): void {
        this._interval = setInterval(this.tick, this._tickIntervalMs);
    }

    stop(): void {
        if (!this._interval)
            return;
        clearInterval(this._interval);
        this._interval = undefined;
    }

    private tick() {
        this._world?.tick();
    }
}