import {IItemInstance} from "./abstract";

export interface IInventory {
    readonly items: readonly IItemInstance[];

    add(item: IItemInstance): void;

    remove(item: IItemInstance, count: number): void;
}

export class Inventory implements IInventory {
    get items(): readonly IItemInstance[] {
        return this._items;
    }

    private _items: IItemInstance[] = [];

    add(item: IItemInstance): void {
        const existing = this._items.find(e => e.type === item.type);
        if (existing && item.stackable)
            existing.count += item.count;
        else
            this._items.push(item);
    }

    remove(item: IItemInstance, count: number): void {
        const index = this._items.findIndex(e => e.id === item.id);
        if (index < 0)
            throw new Error(`Trying to remove unpresent item with id ${item.id}`);
        let instance = this._items[index];
        const left = Math.max(instance.count - count, 0);
        if (item.stackable && left > 0)
            instance.count = left;
        else
            this._items.splice(index, 1);
    }
}