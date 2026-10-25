import {IEntity} from "./abstract";
import {ClampedNumber, Constants, Vector2} from "./core";
import {IInventory, Inventory} from "./Inventory";

export class Player implements IEntity {
    declare readonly id: string;
    readonly kind: string = 'player';
    readonly inventory: IInventory = new Inventory();

    get hp(): number {
        return this._hp.value;
    }

    set hp(val: number) {
        this._hp.value = val;
    }

    get armor(): number {
        return this._armor.value;
    }

    set armor(val: number) {
        this._armor.value = val;
    }

    get ammo(): number {
        return this._ammo.value;
    }

    set ammo(val: number) {
        this._ammo.value = val;
    }

    get position(): Vector2 {
        return this._position;
    }

    private _position: Vector2 = new Vector2(0, 0);

    private _target?: Vector2;

    constructor(
        private readonly _hp: ClampedNumber,
        private readonly _armor: ClampedNumber,
        private readonly _ammo: ClampedNumber,
        private readonly _speed: number,
        initialPosition: Vector2 = new Vector2(0, 0),
    ) {
        this._position = initialPosition;
    }

    async move(target: Vector2): Promise<void> {
        this._target = target;
        return Promise.resolve();
    }

    tick(): boolean {
        if (this._target) {
            let delta = this._target.subtract(this._position);
            let dist = delta.len();
            if (this._speed >= dist || dist <= Constants.TOLERANCE) {
                this._position = this._target;
                this._target = undefined;
            } else
                this._position = this._position.add(
                    delta.normalize().multiply(this._speed)
                );
        }
        return true;
    }
}