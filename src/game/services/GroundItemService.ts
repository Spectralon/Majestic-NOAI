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
        private readonly _factory: IGameFactory,
        private readonly _inventoryService: IInventoryService,
        private readonly _game: GameLoop,
        _staticData: StaticDataService,
    ) {
        this._pickupRadiusSqr = _staticData.config.PLAYER.groundItemsPickupRadius ** 2;
    }

    async drop(playerId: string, itemId: string): Promise<GroundItem> {
        const player = Utils.getPlayer(this._game, playerId);
        const item = await this._inventoryService.remove(playerId, itemId);
        const groundItem = this._factory.createDrop(item);
        await groundItem.move(player.position);
        await this._game.spawn(groundItem);
        return Promise.resolve(groundItem);
    }

    async pickup(playerId: string, itemId: string): Promise<void> {
        const player = Utils.getPlayer(this._game, playerId);
        const groundItem = Utils.getGroundItem(this._game, itemId);
        if (
            Utils.getDistanceSqr(player, groundItem) > this._pickupRadiusSqr
            || !await this._game.despawn(groundItem)
        )
            return;
        return this._inventoryService.add(playerId, groundItem.item);
    }

}