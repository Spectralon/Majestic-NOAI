import {ICommand} from "./ICommand";
import {IInventoryService} from "../../../game/services/InventoryService";

export class GiveItem implements ICommand<void> {
    readonly type: string = 'give';

    constructor(
        private readonly _inventoryService: IInventoryService
    ) {
    }

    execute(args: Record<string, unknown>): Promise<void> {
        const playerId: string = args.playerId as string;
        const type: string = args.itemType as string;
        const count: number | undefined = args.amount as number | undefined;
        return this._inventoryService.addNew(playerId, type, count || 1);
    }
}