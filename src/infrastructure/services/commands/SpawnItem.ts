import {ICommand} from "./ICommand";
import {IGameFactory} from "../../GameFactory";
import {StaticDataService} from "../StaticDataService";
import {GameLoop} from "../../GameLoop";
import {Vector2} from "../../../game/objects/core";

export class SpawnItem implements ICommand<string> {
    readonly type: string = 'spawn_item';

    private readonly _config;
    private readonly _itemTypes: string[];

    constructor(
        private readonly _factory: IGameFactory,
        private readonly _gameLoop: GameLoop,
        staticData: StaticDataService,
    ) {
        this._config = staticData.config;
        this._itemTypes = Object.keys(this._config.ITEMS.prototypes);
    }

    async execute(args: Record<string, unknown>): Promise<string> {
        const x = args.x as number
            || Math.random() * (this._config.WORLD.width - 2 * this._config.PLAYER.radius);
        const y = args.y as number
            || Math.random() * (this._config.WORLD.height - 2 * this._config.PLAYER.radius);
        const item = this._factory.createItem(this.randomType());
        const groundItem = this._factory.createDrop(item);
        await groundItem.move(new Vector2(x, y));
        this._gameLoop.world.spawn(groundItem);
        return Promise.resolve(groundItem.id);
    }

    randomType() {
        return this._itemTypes[Math.floor(Math.random() * this._itemTypes.length)];
    }
}