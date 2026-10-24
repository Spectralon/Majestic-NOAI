import {ICommand} from "./ICommand";
import {IGroundItemService} from "../../../game/services/GroundItemService";

export class PickupItem implements ICommand<void> {
    readonly type: string = 'pickup';

    constructor(
        private readonly _groundItemService: IGroundItemService
    ) {
    }

    async execute(args: Record<string, unknown>): Promise<void> {
        const playerId: string = args.playerId as string;
        const itemId: string = args.groundItemId as string;
        await this._groundItemService.pickup(playerId, itemId);
        return Promise.resolve();
    }
}