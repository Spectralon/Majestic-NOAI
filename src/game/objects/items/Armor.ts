import {IItem} from "../abstract";
import {Player} from "../Player";

export class Armor implements IItem {
    readonly type: string = 'armor';
    readonly stackable: boolean = false;

    constructor(private readonly _addArmor: number) {
    }

    onUse(player: Player) {
        player.armor += this._addArmor;
    }
}