import {ICommand} from "./ICommand";
import {IGameFactory} from "../../GameFactory";
import {StaticDataService} from "../StaticDataService";
import {GameLoop} from "../../GameLoop";
import {Player} from "../../../game/objects/Player";

export class SpawnPlayer implements ICommand<void> {
    readonly type: string = 'spawn';

    private readonly _config;

    constructor(
        private readonly _factory: IGameFactory,
        private readonly _gameLoop: GameLoop,
        staticData: StaticDataService,
    ) {
        this._config = staticData.config;
    }

    execute(args: Record<string, unknown>): Promise<void> {
        const x = Math.random() * this._config.WORLD.width;
        const y = Math.random() * this._config.WORLD.height;
        const player: Player = this._factory.createPLayer({x, y});
        this._gameLoop.world.spawn(player);
        return Promise.resolve();
    }
}