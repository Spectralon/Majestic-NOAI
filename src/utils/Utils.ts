import {IGameRegistry} from "../infrastructure/services/GameRegistry";
import {Player} from "../game/objects/Player";
import {GroundItem} from "../game/objects/GroundItem";

export function getGroundItem(registry: IGameRegistry, itemId: string): GroundItem {
    return registry.getEntity(itemId) as GroundItem;
}

export function getPlayer(registry: IGameRegistry, id: string): Player {
    return registry.getEntity(id) as Player;
}