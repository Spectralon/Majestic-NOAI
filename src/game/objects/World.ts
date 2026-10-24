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

    despawn(entity: IEntity): void {
        this._entities.splice(this._entities.indexOf(entity), 1);
    }

    tick(): boolean {
        this._entities = this._entities.filter(entity => entity.tick());
        this._currentTick++;
        return this._entities.length > 0;
    }
}