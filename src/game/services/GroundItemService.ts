import {IInventoryService} from "./InventoryService";
import {IGameFactory} from "../../infrastructure/GameFactory";
import {GroundItem} from "../objects/GroundItem";
import {IGameRegistry} from "../../infrastructure/services/GameRegistry";
import * as Utils from "../../utils/Utils";
import {GameLoop} from "../../infrastructure/GameLoop";
import {StaticDataService} from "../../infrastructure/services/StaticDataService";

export interface IGroundItemService {
    drop(playerId: string, itemId: string): Promise<GroundItem>;

    pickup(playerId: string, itemId: string): Promise<void>;
}

export class GroundItemService implements IGroundItemService {
    readonly _pickupRadiusSqr: number;

    constructor(
        private readonly _registry: IGameRegistry,
        private readonly _factory: IGameFactory,
        private readonly _gameLoop: GameLoop,
        private readonly _inventoryService: IInventoryService,
        _staticData: StaticDataService,
    ) {
        this._pickupRadiusSqr = _staticData.config.groundItemsPickupRadius ** 2;
    }

    async drop(playerId: string, itemId: string): Promise<GroundItem> {
        const player = Utils.getPlayer(this._registry, playerId);
        const item = await this._inventoryService.remove(playerId, itemId);
        const groundItem = this._factory.createDrop(item);
        await groundItem.move(player.position);
        this._gameLoop.world.spawn(groundItem);
        return Promise.resolve(groundItem);
    }

    async pickup(playerId: string, itemId: string): Promise<void> {
        const player = Utils.getPlayer(this._registry, playerId);
        const groundItem = Utils.getGroundItem(this._registry, itemId);
        if (Utils.getDistanceSqr(player, groundItem) > this._pickupRadiusSqr)
            return;
        this._gameLoop.world.despawn(groundItem);
        return this._inventoryService.add(playerId, groundItem.item);
    }

}