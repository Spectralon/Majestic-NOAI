import {IItem} from "../abstract";
import {Player} from "../Player";

export class Medkit implements IItem {
    readonly type: string = 'medkit';
    readonly stackable: boolean = false;

    onUse(player: Player) {
        player.hp = Number.MAX_SAFE_INTEGER;
    }
}
