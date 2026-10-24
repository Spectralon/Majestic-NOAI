import {Vector2} from "./core";
import {Player} from "./Player";
import {World} from "./World";

export interface IId {
    readonly id: string;
}

export interface ITickable {
    tick(): boolean;
}

export interface IMovable {
    readonly position: Vector2;

    move(target: Vector2): Promise<void>;
}

export interface IEffect<T> {
    readonly type: string;
    readonly ttl?: number;

    apply(target: T): void;
}

export interface IEntity extends IId, ITickable, IMovable {
}

export interface IItem {
    readonly type: string;
    readonly stackable: boolean;

    onPickup?(player: Player, world: World): void;

    onDrop?(player: Player, world: World): void;

    onUse?(player: Player, world: World): void;
}

export interface IItemInstance extends IItem, IId {
    count: number;
}

