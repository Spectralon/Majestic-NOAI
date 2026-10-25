import {Player} from "../game/objects/Player";
import {GroundItem} from "../game/objects/GroundItem";
import {IMovable} from "../game/objects/abstract";
import {GameLoop} from "../infrastructure/GameLoop";

export function getGroundItem(game: GameLoop, itemId: string): GroundItem {
    return game.world.getEntity(itemId) as GroundItem;
}

export function getPlayer(game: GameLoop, id: string): Player {
    return game.world.getEntity(id) as Player;
}

export function getDistanceSqr(x1: IMovable, x2: IMovable): number {
    return (x1.position.x - x2.position.x) ** 2
        + (x1.position.y - x2.position.y) ** 2;
}