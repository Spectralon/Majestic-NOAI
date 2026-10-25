import {IEffect, IItem, IItemInstance} from "../game/objects/abstract";
import {IGameRegistry} from "./services/GameRegistry";
import {ItemInstance} from "../game/objects/ItemInstance";
import {StaticDataService} from "./services/StaticDataService";
import {GroundItem} from "../game/objects/GroundItem";
import {EffectInstance} from "../game/objects/EffectInstance";
import {Ammo} from "../game/objects/items/Ammo";
import {Bandage} from "../game/objects/items/Bandage";
import {Armor} from "../game/objects/items/Armor";
import {Medkit} from "../game/objects/items/Medkit";
import {IEffectService} from "../game/services/EffectService";
import {BandageEffect} from "../game/objects/effects/BandageEffect";
import {Vector2} from "../game/objects/core";
import {Player} from "../game/objects/Player";

export interface IGameFactory {
    createItem(type: string, count?: number): IItemInstance;

    createDrop(item: IItemInstance): GroundItem;

    createEffect<T>(effectType: string, target: T): EffectInstance<T>;

    createPLayer(initialPosition: Vector2): Player;
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

    createPLayer(initialPosition: Vector2): Player {
        const cfg = this._config.PLAYER;
        const player: Player = new Player(
            cfg.hp.clone(),
            cfg.armor.clone(),
            cfg.ammo.clone(),
            cfg.speed,
            initialPosition
        );
        this._registry.register(player);
        return player;
    }

    init(effectService: IEffectService): void {
        const itemsCfg = this._config.ITEMS.prototypes;
        this._itemPrototypes.push(
            new Ammo(itemsCfg.ammo.addAmmo),
            new Armor(itemsCfg.armor.addArmor),
            new Bandage(effectService),
            new Medkit()
        );
        const effectsCfg = this._config.EFFECTS;
        this._effectPrototypes.push(
            new BandageEffect(effectsCfg.bandage.hpPerTick, effectsCfg.bandage.ttl)
        );
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