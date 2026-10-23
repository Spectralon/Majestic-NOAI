import {IItemInstance} from "./abstract";

export interface IInventory {
    add(item: IItemInstance): void;

    remove(item: IItemInstance): void;
}

export class Inventory implements IInventory {
    private _items: IItemInstance[] = [];

    add(item: IItemInstance): void {
        const existing = this._items.find(e => e.type === item.type);
        if (existing && item.stackable)
            existing.count += item.count;   // TODO: Валидация
        else
            this._items.push(item);
    }

    remove(item: IItemInstance): void {
    }
}