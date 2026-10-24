import {Player} from "../Player";
import {IEffect} from "../abstract";

export class BandageEffect implements IEffect<Player> {
    readonly type: string = 'bandage';
    readonly ttl: number;

    constructor(
        private readonly _hpPerTick: number,
        ttl: number,
    ) {
        this.ttl = ttl;
    }

    apply(target: Player) {
        target.hp += this._hpPerTick;
    }
}