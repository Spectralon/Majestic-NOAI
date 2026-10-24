import {IItem} from "../abstract";
import {Player} from "../Player";
import {World} from "../World";

export class Ammo implements IItem {
    readonly type: string = 'ammo';
    readonly stackable: boolean = true;

    constructor(private readonly _addAmmo: number) {
    }

    onUse(player: Player, world: World) {
        player.ammo += this._addAmmo;
    }
}