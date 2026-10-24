import {IItemInstance} from "../objects/abstract";
import {Player} from "../objects/Player";
import {IGameRegistry} from "../../infrastructure/services/GameRegistry";
import {IInventory} from "../objects/Inventory";
import {IGameFactory} from "../../infrastructure/GameFactory";

export interface IInventoryService {
    add(playerId: string, itemType: string, count: number): Promise<void>;

    remove(playerId: string, itemId: string, count: number): Promise<IItemInstance>;
}

export class InventoryService implements IInventoryService {
    constructor(
        private readonly _registry: IGameRegistry,
        private readonly _factory: IGameFactory,
    ) {
    }

    async add(playerId: string, itemType: string, count: number): Promise<void> {
        const inv = this.getInventory(playerId);
        const item: IItemInstance = this._factory.createItem(itemType, count);
        inv.add(item);
        return Promise.resolve(undefined);
    }

    async remove(playerId: string, itemId: string, count: number): Promise<IItemInstance> {
        const inv = this.getInventory(playerId);
        const item: IItemInstance | undefined = inv.items.find(e => e.id === itemId);
        if (!item)
            throw new Error(`Could not find item id ${itemId} in inventory of ${playerId}`);
        inv.remove(item, count);
        return Promise.resolve(item);
    }

    private getInventory(playerId: string): IInventory {
        return this.getPlayer(playerId).inventory;
    }

    private getPlayer(playerId: string) {
        return this._registry.getEntity(playerId) as Player;
    }
}