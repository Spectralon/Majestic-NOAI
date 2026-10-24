import {IItemInstance} from "../objects/abstract";
import {Player} from "../objects/Player";
import {IGameRegistry} from "../../infrastructure/services/GameRegistry";
import {IInventory} from "../objects/Inventory";

export interface IInventoryService {
    add(playerId: string, item: IItemInstance): Promise<void>;

    remove(playerId: string, item: IItemInstance): Promise<void>;
}

export class InventoryService implements IInventoryService {
    constructor(
        private readonly _registry: IGameRegistry
    ) {
    }

    async add(playerId: string, item: IItemInstance): Promise<void> {
        const inv = this.getInventory(playerId);
        inv.add(item);
        return Promise.resolve(undefined);
    }

    async remove(playerId: string, item: IItemInstance): Promise<void> {
        const inv = this.getInventory(playerId);
        inv.remove(item);
        return Promise.resolve(undefined);
    }

    private getInventory(playerId: string): IInventory {
        return this.getPlayer(playerId).inventory;
    }

    private getPlayer(playerId: string) {
        return this._registry.getEntity(playerId) as Player;
    }
}