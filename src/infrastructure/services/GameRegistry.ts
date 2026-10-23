import {IId} from "../../game/objects/abstract";

export interface IGameRegistry {
    register(entity: IId, id?: string | undefined): void;

    unregister(entity: IId): void;

    getEntity(entityId: string): IId | undefined;

    getId(entity: IId): string | undefined;
}

export class GameRegistry implements IGameRegistry {
    private _objects: Map<string, IId> = new Map();
    private _index = new WeakMap<IId, string>();

    private _counter: number = 0;

    register(entity: IId, id: string | undefined = undefined): void {
        if (id !== undefined && this._objects.has(id)) {
            const existing = this._objects.get(id);
            if (existing)
                this.unregister(existing);
        }
        const key = id ?? this.nextId();
        this._objects.set(key, entity);
        this._index.set(entity, key);
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

    getId(entity: IId): string | undefined {
        return this._index.get(entity);
    }

    private nextId(): string {
        return `entity_${this._counter++}`;
    }
}