import {ICommand} from "./ICommand";
import {IInventoryService} from "../../../game/services/InventoryService";

export class UseItem implements ICommand<void> {
    readonly type: string = 'use';

    constructor(
        private readonly _inventoryService: IInventoryService
    ) {
    }

    async execute(args: Record<string, unknown>): Promise<void> {
        const playerId: string = args.playerId as string;
        const itemId: string = args.itemId as string;
        await this._inventoryService.use(playerId, itemId);
        return Promise.resolve();
    }
}