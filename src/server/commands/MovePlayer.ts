import {ICommand} from "./ICommand";
import {Vector2} from "../../game/objects/core";
import {IEntityMovementService} from "../../game/services/EntityMovementService";

export class MovePlayer implements ICommand<void> {
    readonly type: string = 'move';

    constructor(
        private readonly _mover: IEntityMovementService
    ) {
    }

    execute(args: Record<string, unknown>): Promise<void> {
        const playerId: string = args.playerId as string;
        const target: Vector2 = new Vector2(args.x as number, args.y as number);
        return this._mover.move(playerId, target);
    }
}