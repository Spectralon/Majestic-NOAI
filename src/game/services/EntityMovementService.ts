import {Vector2} from "../objects/core";
import {IGameRegistry} from "../../infrastructure/services/GameRegistry";
import {IEntity} from "../objects/abstract";
import {GameLoop} from "../../infrastructure/GameLoop";

export interface IEntityMovementService {
    move(entityId: string, target: Vector2): Promise<void>;
}

export class EntityMovementService implements IEntityMovementService {
    constructor(
        private readonly _gameLoop: GameLoop
    ) {
    }

    async move(entityId: string, target: Vector2): Promise<void> {
        const entity: IEntity | undefined = this._gameLoop.world.getEntity(entityId);
        if (!entity)
            throw new Error(`Entity ${entityId} not found`);
        return entity.move(target);
    }
}