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

    add(playerId: string, item: IItemInstance): Promise<void> {
        return Promise.resolve(undefined);
    }

    remove(playerId: string, item: IItemInstance): Promise<void> {
        return Promise.resolve(undefined);
    }

    private getInventory(playerId: string): IInventory {
        return (this._registry.getEntity(playerId) as Player).inventory;
    }
}