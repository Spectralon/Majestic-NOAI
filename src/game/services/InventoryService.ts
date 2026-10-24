import {IItemInstance} from "../objects/abstract";
import {IGameRegistry} from "../../infrastructure/services/GameRegistry";
import {IInventory} from "../objects/Inventory";
import {IGameFactory} from "../../infrastructure/GameFactory";
import * as Utils from "../../utils/Utils";

export interface IInventoryService {
    addNew(playerId: string, itemType: string, count: number): Promise<void>;

    add(playerId: string, item: IItemInstance): Promise<void>;

    remove(playerId: string, itemId: string, count?: number): Promise<IItemInstance>;

    use(playerId: string, itemId: string): Promise<void>;
}

export class InventoryService implements IInventoryService {
    constructor(
        private readonly _registry: IGameRegistry,
        private readonly _factory: IGameFactory,
    ) {
    }

    async addNew(playerId: string, itemType: string, count: number): Promise<void> {
        const item: IItemInstance = this._factory.createItem(itemType, count);
        return await this.add(playerId, item);
    }

    async add(playerId: string, item: IItemInstance): Promise<void> {
        const inv = this.getInventory(playerId);
        inv.add(item);
        return Promise.resolve();
    }

    async remove(playerId: string, itemId: string, count?: number): Promise<IItemInstance> {
        const inv = this.getInventory(playerId);
        const item: IItemInstance | undefined = inv.items.find(e => e.id === itemId);
        if (!item)
            throw new Error(`Could not find item id ${itemId} in inventory of ${playerId}`);
        inv.remove(item, count || item.count);
        return Promise.resolve(item);
    }

    use(playerId: string, itemId: string): Promise<void> {
        const player = Utils.getPlayer(this._registry, playerId);
        const item: IItemInstance | undefined = player.inventory.items.find(e => e.id === itemId);
        if (!item)
            throw new Error(`Could not find item id ${itemId} in inventory of ${playerId}`);
        item.onUse?.(player);
        return Promise.resolve();
    }

    private getInventory(playerId: string): IInventory {
        return Utils.getPlayer(this._registry, playerId).inventory;
    }
}