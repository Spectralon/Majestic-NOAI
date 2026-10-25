import {IEffect, IEntity} from "./abstract";
import {Vector2} from "./core";

export class EffectInstance<T> implements IEntity {
    declare readonly id: string;
    readonly kind: string = 'effect_instance';

    get position(): Vector2 {
        return this._position;
    }

    private _position: Vector2 = new Vector2(0, 0);

    private _ttl?: number;

    constructor(
        private readonly _base: IEffect<T>,
        private readonly _target: T,
    ) {
        this._ttl = _base.ttl;
    }

    tick(): boolean {
        this._base.apply(this._target);
        if (!this._ttl)
            return true;
        this._ttl--;
        return this._ttl > 0;
    }

    move(target: Vector2): Promise<void> {
        this._position = target;
        return Promise.resolve();
    }
}