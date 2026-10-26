import {ICommand} from "./ICommand";
import {IGroundItemService} from "../../game/services/GroundItemService";

export class DropItem implements ICommand<void> {
    readonly type: string = 'drop';

    constructor(
        private readonly _groundItemService: IGroundItemService
    ) {
    }

    async execute(args: Record<string, unknown>): Promise<void> {
        const playerId: string = args.playerId as string;
        const itemId: string = args.itemId as string;
        await this._groundItemService.drop(playerId, itemId);
        return Promise.resolve();
    }
}