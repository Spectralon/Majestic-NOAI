import {IItem, IItemInstance} from "./abstract";

export class ItemInstance implements IItemInstance {
    readonly stackable: boolean;
    readonly type: string;

    get count(): number {
        return this._count;
    }

    set count(value: number) {
        if (value < 0)
            throw new Error(`Item count could not be negative: ${this}`);
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
    }
}