import {ICommand} from "./ICommand";
import {IItemInstance} from "../../../game/objects/abstract";
import {IInventoryService} from "../../../game/services/InventoryService";

export class GetInventory implements ICommand<IItemInstance[]> {
    readonly type: string = 'get_inventory';

    constructor(
        private readonly _inventoryService: IInventoryService
    ) {
    }

    execute(args: Record<string, unknown>): Promise<IItemInstance[]> {
        const playerId: string = args.playerId as string;
        return Promise.resolve(this._inventoryService.getInventory(playerId).items.slice());
    }

}