import {ICommand} from "./ICommand";
import {IGameFactory} from "../../GameFactory";
import {StaticDataService} from "../StaticDataService";
import {GameLoop} from "../../GameLoop";
import {Player} from "../../../game/objects/Player";
import {Vector2} from "../../../game/objects/core";

export class SpawnPlayer implements ICommand<string> {
    readonly type: string = 'spawn';

    private readonly _config;

    constructor(
        private readonly _factory: IGameFactory,
        private readonly _gameLoop: GameLoop,
        staticData: StaticDataService,
    ) {
        this._config = staticData.config;
    }

    async execute(args: Record<string, unknown>): Promise<string> {
        const x = Math.random() * (this._config.WORLD.width - 2 * this._config.PLAYER.radius);
        const y = Math.random() * (this._config.WORLD.height - 2 * this._config.PLAYER.radius);
        const player: Player = this._factory.createPLayer(new Vector2(x, y));
        await this._gameLoop.spawn(player);
        return Promise.resolve(player.id);
    }
}