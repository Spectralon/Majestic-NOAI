import {ICommand} from "./ICommand";
import {Vector2} from "../../../game/objects/core";
import {IGameRegistry} from "../GameRegistry";
import {Player} from "../../../game/objects/Player";

export class MovePlayer implements ICommand<void> {
    readonly type: string = 'move';

    constructor(private readonly _registry: IGameRegistry) {
    }

    execute(args: Record<string, unknown>): Promise<void> {
        let playerId: string = args.playerId as string;
        let target: Vector2 = new Vector2(args.x as number, args.y as number);
        let player: Player = this._registry.getEntity(playerId) as Player;
        return player.move(target);
    }
}