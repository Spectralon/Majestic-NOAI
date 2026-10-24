import {IItem} from "../abstract";
import {Player} from "../Player";
import {World} from "../World";

export class Armor implements IItem {
    readonly type: string = 'armor';
    readonly stackable: boolean = false;

    constructor(private readonly _addArmor: number) {
    }

    onUse(player: Player, world: World) {
        player.armor += this._addArmor;
    }
}