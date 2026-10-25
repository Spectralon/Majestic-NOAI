import {World} from "../game/objects/World";
import {StaticDataService} from "./services/StaticDataService";
import EventEmitter from "node:events";
import {IStorage} from "./storage/IStorage";
import {IEntity} from "../game/objects/abstract";

export class GameLoop extends EventEmitter {
    private _world?: World;
    private _interval?: NodeJS.Timeout;

    private readonly _tickIntervalMs: number;

    constructor(
        private readonly _storage: IStorage,
        staticData: StaticDataService
    ) {
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

    async spawn(entity: IEntity): Promise<void> {
        if (!this._world)
            throw new Error("Game Loop is not started yet!");
        this._world.spawn(entity);
        await this._storage.syncWorldState(this._world);
    }

    async despawn(entity: IEntity): Promise<boolean> {
        if (!this._world)
            throw new Error("Game Loop is not started yet!");
        return this._world.despawn(entity)
            && await this._storage.syncWorldState(this._world);
    }

    getEntity(id: string) {
        if (!this._world)
            throw new Error("Game Loop is not started yet!");
        return this._world.getEntity(id);
    }

    private tick() {
        this._world?.tick();
        this.emit('tick', this._world);
    }
}