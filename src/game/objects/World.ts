import {IEntity, ITickable} from "./abstract";

export class World implements ITickable {
    get currentTick(): number {
        return this._currentTick;
    }

    private _entities: IEntity[] = [];
    private _currentTick: number = 0;

    spawn(entity: IEntity): void {
        this._entities.push(entity);
    }

    despawn(entity: IEntity): boolean {
        let idx = this._entities.indexOf(entity);
        if (!entity || idx < 0)
            return false;
        this._entities.splice(idx, 1);
        return true;
    }

    tick(): boolean {
        this._entities = this._entities.filter(entity => entity.tick());
        this._currentTick++;
        return this._entities.length > 0;
    }
}