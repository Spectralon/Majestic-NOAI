import {IGameRegistry} from "../infrastructure/services/GameRegistry";
import {Player} from "../game/objects/Player";

export function getPlayer(registry: IGameRegistry, id: string): Player {
    return registry.getEntity(id) as Player;
}