import {World} from "../game/objects/World";
import {StaticDataService} from "./services/StaticDataService";
import EventEmitter from "node:events";

export class GameLoop extends EventEmitter {
    get world(): World {
        if (!this._world)
            throw new Error("Game Loop is not started yet!");
        return this._world;
    }

    private _world?: World;
    private _interval?: NodeJS.Timeout;

    private readonly _tickIntervalMs: number;

    constructor(staticData: StaticDataService) {
        super();
        this._tickIntervalMs = staticData.config.WORLD.tickIntervalMs;
    }

    start(): void {
        this._world = new World();
        this._interval = setInterval(() => this.tick(), this._tickIntervalMs);
    }

    stop(): void {
        this._world = undefined;
        if (!this._interval)
            return;
        clearInterval(this._interval);
        this._interval = undefined;
    }

    private tick() {
        this._world?.tick();
        this.emit('tick');
    }
}