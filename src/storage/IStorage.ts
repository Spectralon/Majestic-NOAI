import {World} from "../game/objects/World";

export interface IStorage {
    syncWorldState(world: World): Promise<boolean>;
}