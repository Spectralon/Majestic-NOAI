import {IGameFactory} from "../../infrastructure/GameFactory";
import {GameLoop} from "../../infrastructure/GameLoop";

export interface IEffectService {
    addEffect<T>(effectType: string, target: T): Promise<void>;
}

export class EffectService implements IEffectService {
    constructor(
        private readonly _factory: IGameFactory,
        private readonly _gameLoop: GameLoop,
    ) {
    }

    async addEffect<T>(effectType: string, target: T) {
        const effect = this._factory.createEffect<T>(effectType, target);
        await this._gameLoop.spawn(effect);
    }
}