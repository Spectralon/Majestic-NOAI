import {IItem, IItemInstance} from "./abstract";
import {Player} from "./Player";

export class ItemInstance implements IItemInstance {
    declare readonly id: string;
    readonly stackable: boolean;
    readonly type: string;

    get count(): number {
        return this._count;
    }

    set count(value: number) {
        if (value < 0)
            throw new Error(`Item count for id ${this.id} of type ${this.type} could not be negative!`);
        this._count = value;
    }

    private _count: number = 0;

    constructor(
        base: IItem,
        count: number = 0
    ) {
        this.stackable = base.stackable;
        this.type = base.type;
        this._count = count;

        this.onPickup = base.onPickup?.bind(base);
        this.onDrop = base.onDrop?.bind(base);
        this.onUse = base.onUse?.bind(base);
    }

    onPickup?(player: Player): void;

    onDrop?(player: Player): void;

    onUse?(player: Player): void;
}