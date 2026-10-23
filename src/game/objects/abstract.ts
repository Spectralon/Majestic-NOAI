import {Vector2} from "./core";

export interface IId {
}

export interface ITickable {
    tick(): boolean;
}

export interface IMovable {
    readonly position: Vector2;
    move(target: Vector2): Promise<void>;
}

export interface IEntity extends IId, ITickable, IMovable {
}

export interface IItem {
    readonly type: string;
    readonly stackable: boolean;
}

export interface IItemInstance extends IItem, IId {
    count: number;
}

