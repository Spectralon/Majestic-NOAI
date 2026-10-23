import {IEntity} from "./abstract";
import {Vector2} from "./core";

import {IInventory, Inventory} from "./Inventory";

export class Player implements IEntity {
    readonly inventory: IInventory = new Inventory();

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