import {IInventoryService} from "./InventoryService";
import {IGameFactory} from "../../infrastructure/GameFactory";
import {GroundItem} from "../objects/GroundItem";
import {IGameRegistry} from "../../infrastructure/services/GameRegistry";
import * as Utils from "../../utils/Utils";
import {GameLoop} from "../../infrastructure/GameLoop";

export interface IGroundItemService {
    drop(playerId: string, itemId: string): Promise<GroundItem>;
}

export class GroundItemService implements IGroundItemService {
    constructor(
        private readonly _registry: IGameRegistry,
        private readonly _factory: IGameFactory,
        private readonly _gameLoop: GameLoop,
        private readonly _inventoryService: IInventoryService
    ) {
    }

    async drop(playerId: string, itemId: string): Promise<GroundItem> {
        const player = Utils.getPlayer(this._registry, playerId);
        const item = await this._inventoryService.remove(playerId, itemId);
        const groundItem = this._factory.createDrop(item);
        await groundItem.move(player.position);
        this._gameLoop.world.spawn(groundItem);
        return Promise.resolve(groundItem);
    }

}