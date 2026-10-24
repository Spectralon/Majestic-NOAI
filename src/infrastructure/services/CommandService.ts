import {ICommand} from "./commands/ICommand";
import {GiveItem} from "./commands/GiveItem";
import {IInventoryService} from "../../game/services/InventoryService";
import {DropItem} from "./commands/DropItem";
import {PickupItem} from "./commands/PickupItem";
import {UseItem} from "./commands/UseItem";
import {GetInventory} from "./commands/GetInventory";
import {IGroundItemService} from "../../game/services/GroundItemService";
import {MovePlayer} from "./commands/MovePlayer";
import {IEntityMovementService} from "../../game/services/EntityMovementService";

export interface ICommandService {
    execute<T>(args: Record<string, unknown>): Promise<T>;
}

export class CommandService implements ICommandService {
    private _commands: ICommand<any>[] = [];

    init(
        inventoryService: IInventoryService,
        groundItemService: IGroundItemService,
        movementService: IEntityMovementService
    ): void {
        this._commands.push(
            new GiveItem(inventoryService),
            new DropItem(groundItemService),
            new PickupItem(groundItemService),
            new UseItem(inventoryService),
            new GetInventory(inventoryService),
            new MovePlayer(movementService),
        );
    }

    async execute<T>(args: Record<string, unknown>): Promise<T> {
        const type: string = args.type as string;
        return this._commands.find(e => e.type === type)?.execute(args);
    }
}