import {IItem, IItemInstance} from "../game/objects/abstract";
import {IGameRegistry} from "./services/GameRegistry";
import {ItemInstance} from "../game/objects/ItemInstance";
import {StaticDataService} from "./services/StaticDataService";

export interface IGameFactory {
    createItem(type: string, count: number | undefined): IItemInstance;
}

class GameFactory implements IGameFactory {

    private readonly _itemPrototypes: IItem[] = [

    ];

    constructor(
        private readonly _registry: IGameRegistry,
        private readonly _staticDataService: StaticDataService
    ) {
    }

    createItem(type: string, count: number = 1): IItemInstance {
        const prototype: IItem | undefined = this._itemPrototypes.find(e => e.type === type);
        if(!prototype)
            throw new Error(`No prototype for item: ${type}`);
        return this.createItemByPrototype(prototype!, count);
    }

    private createItemByPrototype(prototype: IItem, count: number = 1): IItemInstance {
        const instance: IItemInstance = new ItemInstance(prototype, count);
        this._registry.register(instance);
        return instance;
    }
}