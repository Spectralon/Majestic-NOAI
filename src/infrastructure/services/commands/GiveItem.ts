import {ICommand} from "./ICommand";
import {IItemInstance} from "../../../game/objects/abstract";
import {IInventoryService} from "../../../game/services/InventoryService";
import {IGameFactory} from "../../GameFactory";

export class GiveItem implements ICommand<void> {
    readonly type: string = 'give';

    constructor(
        private readonly _factory: IGameFactory,
        private readonly _inventoryService: IInventoryService
    ) {
    }

    execute(args: Record<string, unknown>): Promise<void> {
        const playerId: string = args.playerId as string;
        const type: string = args.itemType as string;
        const count: number | undefined = args.amount as number | undefined;
        const item: IItemInstance = this._factory.createItem(type, count);

        return this._inventoryService.add(playerId, item);
    }
}