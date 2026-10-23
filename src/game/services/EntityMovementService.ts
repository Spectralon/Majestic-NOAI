import {Vector2} from "../objects/core";
import {IGameRegistry} from "../../infrastructure/services/GameRegistry";
import {IEntity} from "../objects/abstract";

export interface IEntityMovementService {
    move(entityId: string, target: Vector2): Promise<void>;
}

class EntityMovementService implements IEntityMovementService {
    constructor(
        private readonly _registry: IGameRegistry
    ) {
    }

    async move(entityId: string, target: Vector2): Promise<void> {
        const entity: IEntity = this._registry.getEntity(entityId) as IEntity;
        return entity.move(target);
    }
}