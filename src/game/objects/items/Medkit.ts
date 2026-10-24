import {IItem} from "../abstract";
import {Player} from "../Player";
import {World} from "../World";

export class Medkit implements IItem {
    readonly type: string = 'medkit';
    readonly stackable: boolean = false;

    onUse(player: Player, world: World) {
        player.hp = Number.MAX_SAFE_INTEGER;
    }
}
