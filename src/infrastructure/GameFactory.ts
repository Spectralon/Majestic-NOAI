import {IEffect, IItem, IItemInstance} from "../game/objects/abstract";
import {IGameRegistry} from "./services/GameRegistry";
import {ItemInstance} from "../game/objects/ItemInstance";
import {StaticDataService} from "./services/StaticDataService";
import {GroundItem} from "../game/objects/GroundItem";
import {EffectInstance} from "../game/objects/EffectInstance";

export interface IGameFactory {
    createItem(type: string, count?: number): IItemInstance;

    createDrop(item: IItemInstance): GroundItem;

    createEffect<T>(effectType: string, target: T): EffectInstance<T>;
}

export class GameFactory implements IGameFactory {
    private readonly _config;
    private readonly _itemPrototypes: IItem[] = [];
    private readonly _effectPrototypes: IEffect<any>[] = [];

    constructor(
        private readonly _registry: IGameRegistry,
        _staticDataService: StaticDataService
    ) {
        this._config = _staticDataService.config;
    }

    createItem(type: string, count?: number): IItemInstance {
        const prototype: IItem | undefined = this._itemPrototypes.find(e => e.type === type);
        if (!prototype)
            throw new Error(`No prototype exists for item: ${type}`);
        return this.createItemByPrototype(prototype, count || 1);
    }

    createDrop(item: IItemInstance): GroundItem {
        const instance = new GroundItem(item, this._config.ITEMS.groundLifetimeTicks);
        this._registry.register(instance);
        return instance;
    }

    createEffect<T>(type: string, target: T): EffectInstance<T> {
        const effect: IEffect<T> | undefined = this._effectPrototypes.find(e => e.type === type);
        if (!effect)
            throw new Error(`No prototype exists for effect: ${type}`);
        return this.createEffectByPrototype<T>(effect, target);

    }

    private createItemByPrototype(prototype: IItem, count: number = 1): IItemInstance {
        const instance: IItemInstance = new ItemInstance(prototype, count);
        this._registry.register(instance);
        return instance;
    }

    private createEffectByPrototype<T>(prototype: IEffect<T>, target: T): EffectInstance<T> {
        const instance: EffectInstance<T> = new EffectInstance<T>(prototype, target);
        this._registry.register(instance);
        return instance;
    }
}