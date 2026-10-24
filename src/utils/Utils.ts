import {IGameRegistry} from "../infrastructure/services/GameRegistry";
import {Player} from "../game/objects/Player";
import {GroundItem} from "../game/objects/GroundItem";
import {IMovable} from "../game/objects/abstract";

export function getGroundItem(registry: IGameRegistry, itemId: string): GroundItem {
    return registry.getEntity(itemId) as GroundItem;
}

export function getPlayer(registry: IGameRegistry, id: string): Player {
    return registry.getEntity(id) as Player;
}

export function getDistanceSqr(x1: IMovable, x2: IMovable): number {
    return (x1.position.x - x2.position.x) ** 2
        + (x1.position.y - x2.position.y) ** 2;
}