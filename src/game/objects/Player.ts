import {IEntity} from "./abstract";
import {Vector2} from "./core";

export class Player implements IEntity {
    get position(): Vector2 {
        return this._position;
    }

    private _position: Vector2 = new Vector2(0, 0);

    async move(target: Vector2): Promise<void> {
        this._position = target;
        return Promise.resolve(undefined);
    }

    tick(): boolean {
        return true;
    }
}