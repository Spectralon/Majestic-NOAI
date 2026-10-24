import {IEntity, IItemInstance} from "./abstract";
import {Vector2} from "./core";

export class GroundItem implements IEntity {
    declare readonly id: string;

    get position(): Vector2 {
        return this._position;
    }

    private _position: Vector2 = new Vector2(0, 0);

    constructor(
        private readonly _item: IItemInstance,
        private _ttl: number,
    ) {
    }

    tick(): boolean {
        this._ttl--;
        return this._ttl > 0;
    }

    move(target: Vector2): Promise<void> {
        this._position = target;
        return Promise.resolve();
    }
}