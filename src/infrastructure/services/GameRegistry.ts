import {IId} from "../../game/objects/abstract";

export interface IGameRegistry {
    register(entity: IId, id?: string): void;

    unregister(entity: IId): void;

    getEntity(entityId: string): IId | undefined;
}

export class GameRegistry implements IGameRegistry {
    private _objects: Map<string, IId> = new Map();
    private _index = new WeakMap<IId, string>();

    private _counter: number = 0;

    register(obj: IId, id?: string): void {
        if (id && this._objects.has(id)) {
            const existing = this._objects.get(id);
            if (existing)
                this.unregister(existing);
        }
        const key = id ?? this.nextId();
        Object.defineProperty(obj, 'id', {
            value: key,
            writable: false,
            configurable: false,
            enumerable: true,
        });
        this._objects.set(key, obj);
        this._index.set(obj, key);
    }

    unregister(entity: IId): void {
        if (!this._index.has(entity))
            return;
        const key = this._index.get(entity);
        if (key)
            this._objects.delete(key);
        this._index.delete(entity);
    }

    getEntity(entityId: string): IId | undefined {
        return this._objects.get(entityId);
    }

    private nextId(): string {
        return `reg_${this._counter++}`;
    }
}